import { Box, Heading } from '@chakra-ui/react'
import { withUrqlClient } from 'next-urql'
import { useRouter } from 'next/router'
import React from 'react'
import Layout from '../../components/Layout'
import { usePostQuery } from '../../generated/graphql'
import { createUrqlClient } from '../../utils'

export interface PostProps {}

export const Post = (_props: PostProps): JSX.Element => {
  const router = useRouter()
  const [{ data, fetching }] = usePostQuery({
    variables: {
      id: typeof router.query.id === 'string' ? router.query.id : '',
    },
  })

  if (fetching) {
    return (
      <Layout>
        <div>loading...</div>
      </Layout>
    )
  }

  if (!data?.post) {
    return (
      <Layout>
        <Box>Could not find post</Box>
      </Layout>
    )
  }

  return (
    <Layout>
      <Heading mb={4}>{data?.post?.title}</Heading>
      {data?.post?.text}
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Post)
