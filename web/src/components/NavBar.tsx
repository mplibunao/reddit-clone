import { Box, Button, Flex, Link } from '@chakra-ui/react'
import React from 'react'
import NextLink from 'next/link'
import { useMeQuery } from '../generated/graphql'

export type NavBarProps = {}

export const NavBar = (props: NavBarProps): JSX.Element => {
  const [{ data, fetching }] = useMeQuery()
  let body = null

  if (fetching) {
    body = null
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href='/login'>
          <Link mr={2}>login</Link>
        </NextLink>

        <NextLink href='/register'>
          <Link>register</Link>
        </NextLink>
      </>
    )
  } else {
    body = (
      <Flex>
        <Box mr={2}>{data.me.username}</Box>
        <Button variant='link'>logout</Button>
      </Flex>
    )
  }

  return (
    <Flex bg='tan' p={4}>
      <Box ml='auto'>{body}</Box>
    </Flex>
  )
}

export default NavBar
