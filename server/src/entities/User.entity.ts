import { Field, ObjectType } from 'type-graphql'
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm'
import { Post } from '.'
import { Updoot } from './Updoot.entity'

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @Column({ unique: true })
  username!: string

  @Column()
  password!: string

  @Field()
  @Column({ unique: true })
  email!: string

  @OneToMany(() => Post, (post) => post.creator)
  posts: Post[]

  @OneToMany(() => Updoot, (updoot) => updoot.userId)
  updoots: Updoot[]

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date
}
