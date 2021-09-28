import faker from 'faker'
import { Connection } from 'typeorm'
import { gqlCall, testConnection } from '../utils/tests'

let conn: Connection

beforeAll(async () => {
  conn = await testConnection()
})

afterAll(async () => {
  await conn.close()
})

describe('post resolver', () => {
  const postTitle = faker.lorem.sentence()
  const postContent = faker.lorem.sentence()

  const fakeUser = {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  }
  let userId: string

  it('creates a user using the register mutation', async () => {
    const response = await gqlCall({
      source: REGISTER_MUTATION,
      variableValues: fakeUser,
      contextValue: { req: { session: {} } as any, res: {} as any },
    })
  })
})

const REGISTER_MUTATION = `
mutation register($username: String!, $email: String!, $password: String!) {
  register(
    options: { username: $username, email: $email, password: $password }
  ) {
    errors {
      field
      message
    }
    user {
      id
      username
      email
    }
  }
}`

const CREATE_POST_MUTATION = `
mutation createPost($title: String!, $content: String!, $imgUrl: String) {
  createPost(title: $title, content: $content, imgUrl: $imgUrl) {
    id
    title
    content
    imgUrl
    createdAt
    updatedAt
  }
}`

const POSTS_QUERY = `
query posts {
  posts {
    id
    title
    content
    imgUrl
    createdAt
    updatedAt
    creator {
      id
      username
    }
  }
}`

const UPDATE_POST_MUTATION = `
mutation updatePost($id: Int!, $title: String!, $content: String!) {
  updatePost(id: $id, title: $title, content: $content) {
    id
    title
    content
    createdAt
    updatedAt
  }
}`

const DELETE_POST_MUTATION = `
mutation deletePost($id: Int!) {
  deletePost(id: $id)
}`
