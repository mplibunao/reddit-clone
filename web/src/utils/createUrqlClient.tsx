import {
  DeletePostMutationVariables,
  LoginMutation,
  LogoutMutation,
  MeDocument,
  MeQuery,
  RegisterMutation,
  VoteMutationVariables,
} from '../generated/graphql'
import { Cache, cacheExchange, Resolver } from '@urql/exchange-graphcache'
import {
  dedupExchange,
  fetchExchange,
  errorExchange,
  stringifyVariables,
  gql,
} from 'urql'
import { betterUpdateQuery } from './betterUpdateQuery'
import { URL } from '../constants'
import Router from 'next/router'
import { isServer } from './isServer'

export const cursorPagination = (): Resolver<any, any, any> => {
  return (_parent, fieldArgs, cache, info) => {
    const { parentKey: entityKey, fieldName } = info
    // fieldName is name of query (posts)
    // entityKey is the operation (Query)

    // Gets list of queries in cache
    const allFields = cache.inspectFields(entityKey)

    // Filter to posts query
    const fieldInfos = allFields.filter((info) => info.fieldName === fieldName)
    const size = fieldInfos.length
    // cache miss; return undefined
    if (size === 0) {
      return undefined
    }

    const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`
    const isItInTheCache = cache.resolve(
      cache.resolve(entityKey, fieldKey) as string,
      'posts'
    )
    // if true, make urql think we did not pass all the data so it's going to fetch from
    // server
    info.partial = !isItInTheCache
    let hasMore = true
    const results: string[] = []

    fieldInfos.forEach((fieldInfo) => {
      // nested resolve since we are using a custom/nested shape resolver
      const key = cache.resolve(entityKey, fieldInfo.fieldKey) as string
      const data = cache.resolve(key, 'posts') as string[]
      const _hasMore = cache.resolve(key, 'hasMore')
      if (!_hasMore) {
        hasMore = _hasMore as boolean
      }
      results.push(...data)
    })

    return {
      __typename: 'PaginatedPosts',
      hasMore,
      posts: results,
    }
  }
}

export const invalidateAllPosts = (cache: Cache) => {
  const allFields = cache.inspectFields('Query')
  const fieldInfos = allFields.filter((info) => info.fieldName === 'posts')
  fieldInfos.forEach((fieldInfo) => {
    cache.invalidate('Query', 'posts', fieldInfo.arguments)
  })
}

export const createUrqlClient = (ssrExchange: any, ctx: any) => {
  let cookie = ''

  if (isServer()) {
    cookie = ctx?.req?.headers?.cookie
  }

  return {
    url: URL as string,
    fetchOptions: {
      credentials: 'include' as const,
      headers: cookie
        ? {
            cookie,
          }
        : undefined,
    },
    exchanges: [
      dedupExchange,
      cacheExchange({
        keys: {
          PaginatedPosts: () => null,
        },
        resolvers: {
          Query: {
            posts: cursorPagination(),
          },
        },
        updates: {
          Mutation: {
            deletePost: (_result, args, cache, _info) => {
              cache.invalidate({
                __typename: 'Post',
                id: (args as DeletePostMutationVariables).id,
              })
            },
            vote: (_result, args, cache, _info) => {
              const { postId, value } = args as VoteMutationVariables
              const data = cache.readFragment(
                gql`
                  fragment _ on Post {
                    id
                    points
                    voteStatus
                  }
                `,
                { id: postId }
              )

              if (data) {
                if (data.voteStatus === value) {
                  return
                }
                const newPoints =
                  data.points + (!data.voteStatus ? 1 : 2) * value

                cache.writeFragment(
                  gql`
                    fragment __ on Post {
                      id
                      points
                      voteStatus
                    }
                  `,
                  { id: postId, points: newPoints, voteStatus: value }
                )
              }
            },
            createPost: (_result, _args, cache, _info) => {
              invalidateAllPosts(cache)
            },
            logout: (_result, _args, cache, _info) => {
              betterUpdateQuery<LogoutMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                () => ({ me: null })
              )
            },
            login: (_result, _args, cache, _info) => {
              betterUpdateQuery<LoginMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                (result, query) => {
                  if (result.login.errors) {
                    return query
                  } else {
                    return {
                      me: result.login.user,
                    }
                  }
                }
              )

              invalidateAllPosts(cache)
            },

            register: (_result, _args, cache, _info) => {
              betterUpdateQuery<RegisterMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                (result, query) => {
                  if (result.register.errors) {
                    return query
                  } else {
                    return {
                      me: result.register.user,
                    }
                  }
                }
              )
            },
          },
        },
      }),
      errorExchange({
        onError(error) {
          if (error?.message.includes('Not authenticated')) {
            Router.replace('/login')
          }
        },
      }),
      ssrExchange,
      fetchExchange,
    ],
  }
}
