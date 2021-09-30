import { Box, Button, Flex, Heading, Link } from '@chakra-ui/react'
import React from 'react'
import NextLink from 'next/link'
import { useLogoutMutation, useMeQuery } from '../generated/graphql'
import { isServer } from '../utils'
//import { useRouter } from 'next/router'
import { useApolloClient } from '@apollo/client'

export interface NavBarProps {}

export const NavBar = (_props: NavBarProps): JSX.Element => {
  //const router = useRouter()
  const [logout, { loading: isLoggingOut }] = useLogoutMutation()
  const apolloClient = useApolloClient()
  const { data, loading } = useMeQuery({
    skip: isServer(),
    // you can now remove this since we are now passing the cookies from
    // nextjs
  })
  let body = null

  if (loading) {
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
      <Flex align='center'>
        <NextLink href='/create-post'>
          <Button as={Link} mr={4}>
            create post
          </Button>
        </NextLink>
        <Box mr={4}>{data.me.username}</Box>
        <Button
          variant='link'
          onClick={async () => {
            await logout()
            await apolloClient.resetStore()
          }}
          isLoading={isLoggingOut}
        >
          logout
        </Button>
      </Flex>
    )
  }

  return (
    <Flex bg='tan' p={4} position='sticky' top='0' zIndex={1}>
      <Flex maxW={800} align='center' flex={1} m='auto'>
        <NextLink href='/'>
          <Link>
            <Heading>LiReddit</Heading>
          </Link>
        </NextLink>
        <Box ml='auto'>{body}</Box>
      </Flex>
    </Flex>
  )
}

export default NavBar
