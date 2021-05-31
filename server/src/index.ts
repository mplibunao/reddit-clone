import 'reflect-metadata'
import { MikroORM } from '@mikro-orm/core'
import express from 'express'
import config from './mikro-orm.config'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { PostResolver, UserResolver } from './resolvers'
import redis from 'redis'
import session from 'express-session'
import connectRedis from 'connect-redis'
import { COOKIE_NAME, __prod__ } from './constants'
import { MyContext } from './types'
import cors from 'cors'

const main = async () => {
  const orm = await MikroORM.init(config)

  orm.getMigrator().up()

  const app = express()

  const RedisStore = connectRedis(session)
  const redisClient = redis.createClient({
    host: 'redis',
    port: 6379,
  })

  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  )

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redisClient,
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
    context: ({ req, res }): MyContext => ({ em: orm.em, req, res }),
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
