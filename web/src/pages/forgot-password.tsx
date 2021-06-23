import { Box, Button } from '@chakra-ui/react'
import { Formik, Form } from 'formik'
import { withUrqlClient } from 'next-urql'
import React, { useState } from 'react'
import InputField from '../components/InputField'
import Wrapper from '../components/Wrapper'
import { useForgotPasswordMutation } from '../generated/graphql'
import { createUrqlClient } from '../utils'

export const ForgotPassword = (): JSX.Element => {
  const [complete, setComplete] = useState(false)
  const [, forgotPassword] = useForgotPasswordMutation()
  return (
    <Wrapper variant='small'>
      <Formik
        initialValues={{ email: '' }}
        onSubmit={async (values, { setErrors }) => {
          await forgotPassword(values)
          setComplete(true)
        }}
      >
        {({ isSubmitting }) =>
          complete ? (
            <Box>
              If an account with that email exisits, we sent you an email
            </Box>
          ) : (
            <Form>
              <InputField
                name='email'
                placeholder='email'
                label='Emal'
                type='email'
              />

              <Button
                type='submit'
                colorScheme='teal'
                mt={4}
                isLoading={isSubmitting}
              >
                Forgot password
              </Button>
            </Form>
          )
        }
      </Formik>
    </Wrapper>
  )
}

export default withUrqlClient(createUrqlClient)(ForgotPassword)
