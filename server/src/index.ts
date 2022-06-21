import { ApolloServer } from 'apollo-server-express'
import connectRedis from 'connect-redis'
import cors from 'cors'
import dotenvsafe from 'dotenv-safe'
import express from 'express'
import session from 'express-session'
import Redis from 'ioredis'
import 'reflect-metadata'
import { createConnection } from 'typeorm'
import { ormconfig } from '../ormconfig'
import {
  COOKIE_NAME,
  IS_PROD,
  NEXT_JS_HOST,
  PORT,
  REDIS_URL,
  SESSION_SECRET,
} from './constants'
import { MyContext } from './types'
import { createSchema } from './utils/createSchema'
import { createUpdootLoader } from './utils/createUpdootLoader'
import { createUserLoader } from './utils/createUserLoader'

dotenvsafe.config({
  example: '../.env.example',
})

const main = async () => {
  const conn = await createConnection(ormconfig())

  await conn.runMigrations()

  //await Post.delete({})

  const app = express()

  const RedisStore = connectRedis(session)
  const redis = new Redis(REDIS_URL)

  // Tell express that we have proxy sitting in front of api so
  // cookies / sessions work
  app.set('trust proxy', 1)
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
        disableTouch: true, // Disables re-saving and resetting the TTL when using touch
        // similar to resave. one should be false if you are not using 10 years as maxAge so doesn't get logged out
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: 'lax', // csrf
        secure: IS_PROD, // cookie only works in https
        domain: IS_PROD ? '.mplibunao.me' : undefined,
      },
      saveUninitialized: false, // forces a new session to be saved. False reduces server store storage
      secret: SESSION_SECRET,
      resave: false, // session is resaved against the server store on each request, even if the session wasn't modified
    })
  )

  const apolloServer = new ApolloServer({
    schema: await createSchema(),
    context: ({ req, res }): MyContext => ({
      req,
      res,
      redis,
      // context is run on every request so new userLoader is created on every
      // request
      // caches and batches users in a single request
      userLoader: createUserLoader(),
      updootLoader: createUpdootLoader(),
    }),
  })

  apolloServer.applyMiddleware({
    app,
    cors: false,
  })

  app.listen(parseInt(PORT), () => {
    console.log('server started on localhost:4000')
  })
}

main().catch((err) => {
  console.log('err', err) // eslint-disable-line no-console
})
