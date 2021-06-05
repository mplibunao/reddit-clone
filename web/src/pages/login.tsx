import React from 'react'
import { Form, Formik } from 'formik'
import { Wrapper } from '../components/Wrapper'
import { InputField } from '../components/InputField'
import { Box, Button } from '@chakra-ui/react'
import { useLoginMutation } from '../generated/graphql'
import { toErrorMap } from '../utils/toErrorMap'
import { useRouter } from 'next/router'
import { createUrqlClient } from '../utils/createUrqlClient'
import { withUrqlClient } from 'next-urql'

export type LoginProps = {}

export const Login = (props: LoginProps): JSX.Element => {
  const [{ error }, login] = useLoginMutation()
  console.log('error', error) // eslint-disable-line no-console
  const router = useRouter()

  return (
    <Wrapper variant='small'>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login({ options: values })

          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors))
          } else if (response.data?.login.user) {
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
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  )
}

export default withUrqlClient(createUrqlClient)(Login)
