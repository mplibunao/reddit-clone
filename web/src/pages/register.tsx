import React from 'react'
import { Form, Formik } from 'formik'
import { Wrapper } from '../components/Wrapper'
import { InputField } from '../components/InputField'
import { Box, Button } from '@chakra-ui/react'
import { MeDocument, MeQuery, useRegisterMutation } from '../generated/graphql'
import { toErrorMap } from '../utils/toErrorMap'
import { useRouter } from 'next/router'
import { withApollo } from '../utils/withApollo'

export const Register = (): JSX.Element => {
  const [register] = useRegisterMutation()
  const router = useRouter()

  return (
    <Wrapper variant='small'>
      <Formik
        initialValues={{ email: '', username: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register({
            variables: { options: values },
            update: (cache, { data }) => {
              cache.writeQuery<MeQuery>({
                query: MeDocument,
                data: {
                  __typename: 'Query',
                  me: data?.register.user,
                },
              })
            },
          })

          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors))
          } else if (response.data?.register.user) {
            router.push('/')
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name='username'
              placeholder='username'
              label='Username'
            />

            <Box mt={4}>
              <InputField
                name='email'
                placeholder='Email'
                label='Email'
                type='text'
              />
            </Box>

            <Box mt={4}>
              <InputField
                name='password'
                placeholder='password'
                label='Password'
                type='password'
              />
            </Box>

            <Button
              type='submit'
              colorScheme='teal'
              mt={4}
              isLoading={isSubmitting}
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  )
}

export default withApollo({ ssr: false })(Register)
