import { GraphQLSchema, graphql } from 'graphql'
import { Maybe } from 'graphql/jsutils/Maybe'
import { MyContext } from '../../types'
import { createSchema } from '../createSchema'

interface Options {
  source: string
  variableValues: Maybe<{
    [key: string]: any
  }>
  contextValue: MyContext
}

let schema: GraphQLSchema

export const gqlCall = async ({
  source,
  variableValues,
  contextValue,
}: Options) => {
  if (!schema) schema = await createSchema()

  return graphql({
    schema,
    source,
    variableValues,
    contextValue,
  })
}
