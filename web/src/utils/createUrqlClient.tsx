import {
  LoginMutation,
  LogoutMutation,
  MeDocument,
  MeQuery,
  RegisterMutation,
} from '../generated/graphql'
import { cacheExchange, Resolver } from '@urql/exchange-graphcache'
import {
  dedupExchange,
  fetchExchange,
  errorExchange,
  stringifyVariables,
} from 'urql'
import { betterUpdateQuery } from './betterUpdateQuery'
import { URL } from '../constants'
import Router from 'next/router'

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

    //const visited = new Set();
    //let result: NullArray<string> = [];
    //let prevOffset: number | null = null;

    //for (let i = 0; i < size; i++) {
    //const { fieldKey, arguments: args } = fieldInfos[i];
    //if (args === null || !compareArgs(fieldArgs, args)) {
    //continue;
    //}

    //const links = cache.resolve(entityKey, fieldKey) as string[];
    //const currentOffset = args[cursorArgument];

    //if (
    //links === null ||
    //links.length === 0 ||
    //typeof currentOffset !== 'number'
    //) {
    //continue;
    //}

    //const tempResult: NullArray<string> = [];

    //for (let j = 0; j < links.length; j++) {
    //const link = links[j];
    //if (visited.has(link)) continue;
    //tempResult.push(link);
    //visited.add(link);
    //}

    //if (
    //(!prevOffset || currentOffset > prevOffset) ===
    //(mergeMode === 'after')
    //) {
    //result = [...result, ...tempResult];
    //} else {
    //result = [...tempResult, ...result];
    //}

    //prevOffset = currentOffset;
    //}

    //const hasCurrentPage = cache.resolve(entityKey, fieldName, fieldArgs);
    //if (hasCurrentPage) {
    //return result;
    //} else if (!(info as any).store.schema) {
    //return undefined;
    //} else {
    //info.partial = true;
    //return result;
    //}
  }
}

export const createUrqlClient = (ssrExchange: any) => ({
  url: URL,
  fetchOptions: {
    credentials: 'include' as const,
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
          createPost: (_result, _args, cache, _info) => {
            const allFields = cache.inspectFields('Query')
            const fieldInfos = allFields.filter(
              (info) => info.fieldName === 'posts'
            )
            fieldInfos.forEach((fieldInfo) => {
              cache.invalidate('Query', 'posts', fieldInfo.arguments)
            })
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
})
