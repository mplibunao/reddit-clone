import { Entity, Property, PrimaryKey, BaseEntity } from '@mikro-orm/core'
import { Field, ID, ObjectType } from 'type-graphql'
import { v4 } from 'uuid'

@ObjectType()
@Entity()
export class Post extends BaseEntity<Post, 'id'> {
  @Field(() => ID)
  @PrimaryKey({ type: 'uuid' })
  id: string = v4()

  @Field()
  @Property({ type: 'text' })
  title!: string

  @Field()
  @Property({ type: 'date' })
  createdAt: Date = new Date()

  @Field()
  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt: Date = new Date()
}
