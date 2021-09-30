import { ApolloClient, InMemoryCache } from '@apollo/client'
import { PaginatedPosts } from '../generated/graphql'
import { URL } from '../constants'
import { NextPageContext } from 'next'
import { isServer } from '.'
import { withApollo as createWithApollo } from 'next-apollo'

const createClient = (ctx?: NextPageContext) => {
  const cookie = isServer() ? ctx?.req?.headers?.cookie : ''

  return new ApolloClient({
    uri: URL,
    credentials: 'include',
    headers: {
      cookie: cookie || '',
    },
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            posts: {
              keyArgs: [],
              merge(
                existing: PaginatedPosts | undefined,
                incoming: PaginatedPosts
              ): PaginatedPosts {
                return {
                  ...incoming,
                  posts: [...(existing?.posts || []), ...incoming.posts],
                }
              },
            },
          },
        },
      },
    }),
  })
}
export const withApollo = createWithApollo(createClient)
