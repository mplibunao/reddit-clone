import { Post } from '../entities'
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from 'type-graphql'
import { MyContext } from '../types'
import { isAuth } from '../middleware/isAuth'
import { getConnection } from 'typeorm'
import { Updoot } from '../entities/Updoot.entity'

@InputType()
class PostInput {
  @Field()
  title: string
  @Field()
  text: string
}

@ObjectType()
export class PaginatedPosts {
  @Field(() => [Post])
  posts: Post[]
  @Field()
  hasMore: boolean
}

@Resolver(() => Post)
export class PostResolver {
  @FieldResolver(() => String)
  textSnippet(@Root() post: Post) {
    return post.text.slice(0, 50)
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async vote(
    @Arg('postId') postId: string,
    @Arg('value', () => Int) value: number,
    @Ctx() { req }: MyContext
  ) {
    const isUpdoot = value !== -1
    const realValue = isUpdoot ? 1 : -1
    const { userId } = req.session
    const updoot = await Updoot.findOne({ where: { postId, userId } })

    // user has voted on post before
    // and they are changing their vote
    if (updoot && updoot?.value !== realValue) {
      console.log('updoot', updoot) // eslint-disable-line no-console
      getConnection().transaction(async (tm) => {
        await tm.query(
          `
            UPDATE updoot
            SET value = $1
            WHERE "postId" = $2 AND "userId" = $3
          `,
          [realValue, postId, userId]
        )

        await tm.query(
          `
            UPDATE post
            SET points = points + $1
            WHERE id = $2
          `,
          [2 * realValue, postId]
        )
      })
    } else if (!updoot) {
      // has never voted before
      await getConnection().transaction(async (tm) => {
        await tm.query(
          `
            INSERT INTO updoot ("userId", "postId", value)
            VALUES ($1, $2, $3)
          `,
          [userId, postId, realValue]
        )

        await tm.query(
          `
            UPDATE post
            SET points = points + $1
            WHERE id = $2
          `,
          [realValue, postId]
        )
      })
    }

    return true

    // getting `transaction is aborted, command is ignored until end of
    // transaction`
    // I think this is because when we get an error we need to rollback the
    // transaction
    //await getConnection().query(
    //`
    //START TRANSACTION;

    //INSERT INTO updoot ("userId", "postId", value)
    //VALUES ('${userId}','${postId}',${realValue});

    //UPDATE post
    //SET points = points + ${realValue}
    //WHERE id = '${postId}';

    //COMMIT;
    //`
    //)
  }

  @Query(() => PaginatedPosts)
  async posts(
    @Arg('limit', () => Int) limit: number,
    @Arg('cursor', () => String, { nullable: true }) cursor: string | null
  ): Promise<PaginatedPosts> {
    const realLimit = Math.min(50, limit)
    // fetch an extra post from what user asks
    // if we get an extra it means there is still a next page
    const realLimitPlusOne = realLimit + 1

    const replacements: any[] = [realLimitPlusOne]

    if (cursor) {
      replacements.push(new Date(parseInt(cursor)))
    }
    const posts = await getConnection().query(
      `
        SELECT p.*,
        json_build_object(
          'id', u.id,
          'username', u.username,
          'email', u.email,
          'createdAt', u."createdAt",
          'updatedAt', u."updatedAt"
        ) creator
        FROM post p 
        INNER JOIN public.user u ON u.id = p."creatorId"
        ${cursor ? `WHERE p."createdAt" < $2` : ''}
        ORDER BY p."createdAt" DESC
        LIMIT $1
      `,
      replacements
    )

    //const qb = getConnection()
    //.getRepository(Post)
    //.createQueryBuilder('p')
    //.innerJoinAndSelect('p.creator', 'user', 'user.id = p."creatorId"')
    //.orderBy('p."createdAt"', 'DESC')
    //.take(realLimitPlusOne)

    //if (cursor) {
    //qb.where('p."createdAt" < :cursor', {
    //cursor: new Date(parseInt(cursor)),
    //})
    //}

    //const posts = await qb.getMany()

    return {
      posts: posts.slice(0, realLimit),
      hasMore: posts.length === realLimitPlusOne,
    }
  }

  @Query(() => Post, { nullable: true })
  post(@Arg('id') id: string): Promise<Post | undefined> {
    return Post.findOne(id)
  }

  @Mutation(() => Post)
  @UseMiddleware(isAuth)
  async createPost(
    @Arg('input') input: PostInput,
    @Ctx() { req }: MyContext
  ): Promise<Post> {
    return Post.create({ ...input, creatorId: req.session.userId }).save()
  }

  @Mutation(() => Post, { nullable: true })
  async updatePost(
    @Arg('id') id: string,
    @Arg('title', () => String, { nullable: true }) title: string
  ): Promise<Post | null> {
    const post = await Post.findOne(id)
    if (!post) {
      return null
    }

    if (typeof title !== 'undefined') {
      await Post.update({ id }, { title })
    }

    return post
  }

  @Mutation(() => Boolean)
  async deletePost(@Arg('id') id: string): Promise<boolean> {
    try {
      await Post.delete(id)
      return true
    } catch (err) {
      return false
    }
  }
}
