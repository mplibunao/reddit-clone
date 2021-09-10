import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { Flex, IconButton } from '@chakra-ui/react'
import React, { useState } from 'react'
import { PostSnippetFragment, useVoteMutation } from '../generated/graphql'

export interface UpdootSectionProps {
  post: PostSnippetFragment
  //post: PostsQuery['posts']['posts'][0] // you can also traverse the postquery
  //type if you don't have a fragment
}

export const UpdootSection = ({ post }: UpdootSectionProps): JSX.Element => {
  const [loadingState, setLoadingState] =
    useState<'updoot-loading' | 'downdoot-loading' | 'not-loading'>(
      'not-loading'
    )
  const [, vote] = useVoteMutation()

  return (
    <Flex direction='column' justify='center' align='center' mr={4}>
      <IconButton
        aria-label='upvote post'
        icon={<ChevronUpIcon />}
        fontSize='24px'
        onClick={async () => {
          if (post.voteStatus === 1) {
            return
          }

          setLoadingState('updoot-loading')
          await vote({
            postId: post.id,
            value: 1,
          })
          setLoadingState('not-loading')
        }}
        isLoading={loadingState === 'updoot-loading'}
        colorScheme={post.voteStatus === 1 ? 'green' : 'grey'}
      />

      {post.points}

      <IconButton
        aria-label='downvote post'
        icon={<ChevronDownIcon />}
        fontSize='24px'
        onClick={async () => {
          if (post.voteStatus === -1) {
            return
          }

          setLoadingState('downdoot-loading')
          await vote({
            value: -1,
            postId: post.id,
          })
          setLoadingState('not-loading')
        }}
        isLoading={loadingState === 'downdoot-loading'}
        colorScheme={post.voteStatus === -1 ? 'red' : 'grey'}
      />
    </Flex>
  )
}

export default UpdootSection
