import 'reflect-metadata'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { PostResolver, UserResolver } from './resolvers'
import Redis from 'ioredis'
import session from 'express-session'
import connectRedis from 'connect-redis'
import {
  COOKIE_NAME,
  NEXT_JS_HOST,
  REDIS_HOST,
  __dbPassword__,
  __dbUrl__,
  __dbUser__,
  __prod__,
  __dbName__,
} from './constants'
import { MyContext } from './types'
import cors from 'cors'
import { createConnection } from 'typeorm'
import { Post, User } from './entities'
import path from 'path'

const main = async () => {
  const conn = await createConnection({
    type: 'postgres',
    database: `${__dbName__}`,
    username: __dbUser__,
    password: __dbPassword__,
    logging: true,
    synchronize: true,
    url: __dbUrl__,
    entities: [Post, User],
    migrations: [path.join(__dirname, './migrations/*')],
  })

  await conn.runMigrations()

  //await Post.delete({})

  const app = express()

  const RedisStore = connectRedis(session)
  const redis = new Redis({
    host: REDIS_HOST,
    port: 6379,
  })

  app.use(
    cors({
      origin: NEXT_JS_HOST,
      credentials: true,
    })
  )

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: 'lax', // csrf
        secure: __prod__, // cookie only works in https
      },
      saveUninitialized: false,
      secret: 'ueoanuheonuho',
      resave: false,
    })
  )

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PostResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({ req, res, redis }),
  })

  apolloServer.applyMiddleware({
    app,
    cors: false,
  })

  app.listen(4000, () => {
    console.log('server started on localhost:4000')
  })
}

main().catch((err) => {
  console.log('err', err) // eslint-disable-line no-console
})
