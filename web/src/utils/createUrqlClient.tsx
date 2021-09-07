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
    const isItInTheCache = cache.resolve(entityKey, fieldKey)
    console.log('isItInTheCache', isItInTheCache) // eslint-disable-line no-console
    // if true, make urql think we did not pass all the data so it's going to fetch from
    // server
    info.partial = !isItInTheCache

    const results: string[] = []

    fieldInfos.forEach((fieldInfo) => {
      const data = cache.resolve(entityKey, fieldInfo.fieldKey) as string[]
      results.push(...data)
    })

    return results

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
      resolvers: {
        Query: {
          posts: cursorPagination(),
        },
      },
      updates: {
        Mutation: {
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
