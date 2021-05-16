import { Entity, Property } from '@mikro-orm/core'
import { Field, ObjectType } from 'type-graphql'
import { Base } from '../utils/entities/baseEntity'

@ObjectType()
@Entity()
export class Post extends Base<Post> {
  @Field()
  @Property({ type: 'text' })
  title!: string
}
