import { Box, Button } from '@chakra-ui/react'
import { Formik, Form } from 'formik'
import { useRouter } from 'next/router'
import React from 'react'
import InputField from '../../../components/InputField'
import Layout from '../../../components/Layout'
import { usePostQuery, useUpdatePostMutation } from '../../../generated/graphql'
import { getRouteParams } from '../../../utils/getRouteParams'
import { withApollo } from '../../../utils/withApollo'

export interface EditPostProps {}

export const EditPost = (_props: EditPostProps): JSX.Element => {
  const router = useRouter()
  const id = getRouteParams()

  const [updatePost] = useUpdatePostMutation()
  const { data, loading } = usePostQuery({
    variables: {
      id,
    },
  })

  if (loading) {
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
        onSubmit={async (values) => {
          await updatePost({ variables: { id, ...values } })
          router.back()
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

export default withApollo({ ssr: false })(EditPost)
