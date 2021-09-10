import { Box, Button } from '@chakra-ui/react'
import { Formik, Form } from 'formik'
import { withUrqlClient } from 'next-urql'
import { useRouter } from 'next/router'
import React from 'react'
import InputField from '../../../components/InputField'
import Layout from '../../../components/Layout'
import { usePostQuery, useUpdatePostMutation } from '../../../generated/graphql'
import { createUrqlClient } from '../../../utils'

export interface EditPostProps {}

export const EditPost = (_props: EditPostProps): JSX.Element => {
  const router = useRouter()
  const [, updatePost] = useUpdatePostMutation()
  const id = typeof router.query.id === 'string' ? router.query.id : ''
  const [{ data, fetching }] = usePostQuery({
    variables: {
      id,
    },
  })

  if (fetching) {
    return (
      <Layout>
        <div>loading...</div>
      </Layout>
    )
  }

  if (!data?.post) {
    return (
      <Layout>
        <Box>Could not find post</Box>
      </Layout>
    )
  }

  return (
    <Layout variant='small'>
      <Formik
        initialValues={{ title: data.post.title, text: data.post.text }}
        onSubmit={async ({ text, title }) => {
          updatePost({ id, text, title })
          //const { error } = await createPost({ input: values })
          //if (!error) {
          //router.push('/')
          //}
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
              Update post
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  )
}

export default withUrqlClient(createUrqlClient)(EditPost)
