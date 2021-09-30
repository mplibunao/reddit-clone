import { Box, Heading } from '@chakra-ui/react'
import React from 'react'
import EditDeletePostButtons from '../../components/EditDeletePostButtons'
import Layout from '../../components/Layout'
import { usePostQuery } from '../../generated/graphql'
import { getRouteParams } from '../../utils/getRouteParams'
import { withApollo } from '../../utils/withApollo'

export interface PostProps {}

export const Post = (_props: PostProps): JSX.Element => {
  const id = getRouteParams('id')
  const { data, loading } = usePostQuery({
    variables: {
      id,
    },
  })

  if (loading) {
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

export default withApollo({ ssr: true })(Post)
