import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import { Box, IconButton, Link } from '@chakra-ui/react'
import React from 'react'
import NextLink from 'next/link'
import { useDeletePostMutation, useMeQuery } from '../generated/graphql'

export interface EditDeletePostButtonsProps {
  id: string
  creatorId: string
}

export const EditDeletePostButtons: React.FC<EditDeletePostButtonsProps> = ({
  id,
  creatorId,
}) => {
  const [{ data }] = useMeQuery()
  const [, deletePost] = useDeletePostMutation()

  if (data?.me?.id !== creatorId) {
    return null
  }

  return (
    <Box>
      <NextLink href='/post/edit/[id]' as={`/post/edit/${id}`}>
        <IconButton
          icon={<EditIcon />}
          aria-label={`Edit post`}
          mr={4}
          as={Link}
        />
      </NextLink>
      <IconButton
        icon={<DeleteIcon />}
        aria-label='Delete Post'
        onClick={() => {
          deletePost({ id })
        }}
      />
    </Box>
  )
}

export default EditDeletePostButtons
