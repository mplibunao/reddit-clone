import { Box, Button, Flex, Link } from '@chakra-ui/react'
import React from 'react'
import NextLink from 'next/link'
import { useLogoutMutation, useMeQuery } from '../generated/graphql'
import { isServer } from '../utils'

export interface NavBarProps {}

export const NavBar = (_props: NavBarProps): JSX.Element => {
  const [{ fetching: isLoggingOut }, logout] = useLogoutMutation()
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
    // you can now remove this since we are now passing the cookies from
    // nextjs
  })
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
        <Button
          variant='link'
          onClick={() => logout()}
          isLoading={isLoggingOut}
        >
          logout
        </Button>
      </Flex>
    )
  }

  return (
    <Flex bg='tan' p={4} position='sticky' top='0' zIndex={1}>
      <Box ml='auto'>{body}</Box>
    </Flex>
  )
}

export default NavBar
