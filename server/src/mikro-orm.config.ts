import { MikroORM } from '@mikro-orm/core'
import { DATABASE_URL, IS_PROD } from './constants'
import path from 'path'

export default {
  migrations: {
    path: path.join(__dirname, './migrations'),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
  entities: ['dist/entities/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  debug: !IS_PROD,
  type: 'postgresql',
  clientUrl: DATABASE_URL,
} as Parameters<typeof MikroORM.init>[0]
