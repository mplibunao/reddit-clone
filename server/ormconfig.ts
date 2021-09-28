import { ConnectionOptions } from 'typeorm'
import { DATABASE_URL } from './src/constants'
import { Post, User, Updoot } from './src/entities'

export const ormconfig = (
  dbUrl: string = DATABASE_URL,
  isTest = false
): ConnectionOptions => ({
  type: 'postgres' as const,
  logging: true,
  synchronize: isTest,
  url: dbUrl,
  entities: [Post, User, Updoot],
  migrations: ['dist/migrations/*.js'],
  dropSchema: isTest,
})
