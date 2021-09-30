import { Box, Button, Flex, Heading, Link, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { Layout } from '../components/Layout'
import { usePostsQuery } from '../generated/graphql'
import NextLink from 'next/link'
import { UpdootSection } from '../components/UpdootSection'
import EditDeletePostButtons from '../components/EditDeletePostButtons'
import { withApollo } from '../utils/withApollo'

const Index = () => {
  const { data, loading, error, fetchMore, variables } = usePostsQuery({
    variables: {
      limit: 15,
      cursor: null as null | string,
    },
    notifyOnNetworkStatusChange: true,
  })

  if (!loading && !data) {
    return (
      <div>
        <div>your query failed for some reason</div>
        <div>{error?.message}</div>
      </div>
    )
  }

  return (
    <Layout>
      {loading && !data ? (
        <div>loading...</div>
      ) : (
        <Stack spacing={8}>
          {data?.posts.posts.map((post) =>
            !post ? null : (
              <Flex p={5} shadow='md' borderWidth='1px' key={post.id}>
                <UpdootSection post={post} />

                <Box flex='1'>
                  <NextLink href='/post/[id]' as={`/post/${post.id}`}>
                    <Link>
                      <Heading fontSize='xl'>{post.title}</Heading>
                    </Link>
                  </NextLink>

                  <Text>posted by {post.creator.username}</Text>

                  <Flex align='center'>
                    <Text mt={4}>{post.textSnippet}</Text>

                    <Box ml='auto'>
                      <EditDeletePostButtons
                        id={post.id}
                        creatorId={post.creator.id}
                      />
                    </Box>
                  </Flex>
                </Box>
              </Flex>
            )
          )}
        </Stack>
      )}

      {data?.posts.hasMore && (
        <Flex>
          <Button
            onClick={() => {
              fetchMore({
                variables: {
                  limit: variables?.limit,
                  cursor:
                    data.posts.posts[data.posts.posts.length - 1].createdAt,
                },
                //updateQuery: (previousValue, {}) => {
                //if (!fetchMoreResult) {
                //return previousValue
                //}
                //},
              })
            }}
            isLoading={loading}
            mx='auto'
            my={8}
          >
            load more
          </Button>
        </Flex>
      )}
    </Layout>
  )
}

export default withApollo({ ssr: true })(Index)
