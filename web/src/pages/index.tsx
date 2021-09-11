import { Box, Button, Flex, Heading, Link, Stack, Text } from '@chakra-ui/react'
import { withUrqlClient } from 'next-urql'
import React, { useState } from 'react'
import { Layout } from '../components/Layout'
import { usePostsQuery } from '../generated/graphql'
import { createUrqlClient } from '../utils/createUrqlClient'
import NextLink from 'next/link'
import { UpdootSection } from '../components/UpdootSection'
import EditDeletePostButtons from '../components/EditDeletePostButtons'

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 15,
    cursor: null as null | string,
  })
  const [{ data, fetching, error }] = usePostsQuery({
    variables,
  })

  if (!fetching && !data) {
    return (
      <div>
        <div>your query failed for some reason</div>
        <div>{error?.message}</div>
      </div>
    )
  }

  return (
    <Layout>
      {fetching && !data ? (
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
              setVariables({
                ...variables,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
              })
            }}
            isLoading={fetching}
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

export default withUrqlClient(createUrqlClient, { ssr: true })(Index)
