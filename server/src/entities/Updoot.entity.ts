import { Entity, BaseEntity, ManyToOne, PrimaryColumn, Column } from 'typeorm'
import { Field, ObjectType } from 'type-graphql'
import { User } from './User.entity'
import { Post } from '.'

@ObjectType()
@Entity()
export class Updoot extends BaseEntity {
  @Field()
  @Column({ type: 'int' })
  value: number

  @Field()
  @PrimaryColumn('uuid')
  userId: string

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.updoots)
  user: User

  @Field()
  @PrimaryColumn('uuid')
  postId: string

  @Field(() => Post)
  @ManyToOne(() => Post, (post) => post.updoots, { onDelete: 'CASCADE' })
  post: Post
}
