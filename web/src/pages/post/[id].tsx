import { Box, Heading } from '@chakra-ui/react'
import { withUrqlClient } from 'next-urql'
import React from 'react'
import EditDeletePostButtons from '../../components/EditDeletePostButtons'
import Layout from '../../components/Layout'
import { usePostQuery } from '../../generated/graphql'
import { createUrqlClient } from '../../utils'
import { getRouteParams } from '../../utils/getRouteParams'

export interface PostProps {}

export const Post = (_props: PostProps): JSX.Element => {
  const id = getRouteParams('id')
  const [{ data, fetching }] = usePostQuery({
    variables: {
      id,
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
      <Box mb={4}>{data?.post?.text}</Box>
      <EditDeletePostButtons
        id={data?.post?.id}
        creatorId={data?.post?.creator.id}
      />
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Post)
