import { buildSchema } from 'type-graphql'
import { PostResolver, UserResolver } from '../resolvers'

export const createSchema = () =>
  buildSchema({
    resolvers: [PostResolver, UserResolver],
    validate: false,
  })
