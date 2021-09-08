import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BaseEntity,
  ManyToOne,
  OneToMany,
} from 'typeorm'
import { Field, ObjectType } from 'type-graphql'
import { User } from './User.entity'
import { Updoot } from './Updoot.entity'

@ObjectType()
@Entity()
export class Post extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @Column()
  title!: string

  @Field()
  @Column()
  text!: string

  @Field()
  @Column({ type: 'int', default: 0 })
  points!: number

  @Field()
  @Column('uuid')
  creatorId: string

  @Field()
  @ManyToOne(() => User, (user) => user.posts)
  creator: User

  @OneToMany(() => Updoot, (updoot) => updoot.post)
  updoots: Updoot[]

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date
}
