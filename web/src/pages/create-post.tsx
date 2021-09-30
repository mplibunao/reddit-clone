import { Box, Button } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/router'
import React from 'react'
import InputField from '../components/InputField'
import Layout from '../components/Layout'
import { useCreatePostMutation } from '../generated/graphql'
import { useIsAuth } from '../utils/useIsAuth'
import { withApollo } from '../utils/withApollo'

export const CreatePost = (): JSX.Element => {
  const [createPost] = useCreatePostMutation()
  const router = useRouter()
  useIsAuth()

  return (
    <Layout variant='small'>
      <Formik
        initialValues={{ title: '', text: '' }}
        onSubmit={async (values) => {
          const { errors } = await createPost({
            variables: { input: values },
            update: (cache) => {
              cache.evict({ fieldName: 'posts' })
            },
          })
          if (!errors) {
            router.push('/')
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name='title' placeholder='title' label='Title' />

            <Box mt={4}>
              <InputField
                textarea
                name='text'
                placeholder='text...'
                label='Body'
              />
            </Box>

            <Button
              type='submit'
              colorScheme='teal'
              mt={4}
              isLoading={isSubmitting}
            >
              Create post
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  )
}

export default withApollo({ ssr: false })(CreatePost)
