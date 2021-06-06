import { Entity, Property } from '@mikro-orm/core'
import { Field, ObjectType } from 'type-graphql'
import { Base } from '../utils/entities/baseEntity'

@ObjectType()
@Entity()
export class User extends Base<User> {
  @Field()
  @Property({ type: 'text', unique: true })
  username!: string

  @Property({ type: 'text' })
  password!: string

  @Field()
  @Property({ type: 'text', unique: true })
  email!: string
}
