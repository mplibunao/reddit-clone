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
  textSnippet(@Root() root: Post) {
    return root.text.slice(0, 50)
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
          'email', u.email
        ) creator
        FROM post p 
        INNER JOIN public.user u ON u.id = p."creatorId"
        ${cursor ? `WHERE p."createdAt" < $2` : ''}
        ORDER BY p."createdAt" DESC
        LIMIT $1
      `,
      replacements
    )
    console.log('posts', posts) // eslint-disable-line no-console

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
