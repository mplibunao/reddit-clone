import { Button, Box, Link, Flex } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import InputField from '../../components/InputField'
import Wrapper from '../../components/Wrapper'
import {
  MeDocument,
  MeQuery,
  useChangePasswordMutation,
} from '../../generated/graphql'
import { toErrorMap } from '../../utils'
import NextLink from 'next/link'
import { withApollo } from '../../utils/withApollo'

export const ChangePassword = (): JSX.Element => {
  const router = useRouter()
  const [changePassword] = useChangePasswordMutation()
  const [tokenError, setTokenError] = useState('')

  return (
    <Wrapper variant='small'>
      <Formik
        initialValues={{ newPassword: '' }}
        onSubmit={async (values, { setErrors }) => {
          const response = await changePassword({
            variables: {
              newPassword: values.newPassword,
              token:
                typeof router.query.token === 'string'
                  ? router.query.token
                  : '',
            },
            update: (cache, { data }) => {
              cache.writeQuery<MeQuery>({
                query: MeDocument,
                data: {
                  __typename: 'Query',
                  me: data?.changePassword.user,
                },
              })
            },
          })

          if (response.data?.changePassword.errors) {
            const errorMap = toErrorMap(response.data.changePassword.errors)
            if ('token' in errorMap) {
              setTokenError(errorMap.token)
            }

            setErrors(errorMap)
          } else if (response.data?.changePassword.user) {
            router.push('/')
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name='newPassword'
              placeholder='New password'
              label='New Password'
              type='password'
            />
            {tokenError && (
              <Flex>
                <Box mr={2} color='red'>
                  {tokenError}
                </Box>
                <NextLink href='/forgot-password'>
                  <Link>Click here to get a new one</Link>
                </NextLink>
              </Flex>
            )}

            <Button
              type='submit'
              colorScheme='teal'
              mt={4}
              isLoading={isSubmitting}
            >
              Change Password
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  )
}

// not needed anymore if we take the token from router
// faster w/o getInitialProps unless doing ssr
//ChangePassword.getInitialProps = ({ query }) => {
//return {
//token: query.token as string,
//}
//}

export default withApollo({ ssr: false })(ChangePassword)
