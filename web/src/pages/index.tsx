import { withUrqlClient } from 'next-urql'
import React from 'react'
import NavBar from '../components/NavBar'
import { usePostsQuery } from '../generated/graphql'
import { createUrqlClient } from '../utils/createUrqlClient'

const Index = () => {
  const [{ data }] = usePostsQuery()
  return (
    <>
      <NavBar />
      <div>Hello world</div>
      <br />
      {!data ? (
        <div>loading...</div>
      ) : (
        data.posts.map((post) => <div key={post.id}>{post.title}</div>)
      )}
    </>
  )
}

export default withUrqlClient(createUrqlClient, { ssr: true })(Index)
