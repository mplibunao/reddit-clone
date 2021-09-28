import { createConnection } from 'typeorm'
import { ormconfig } from '../../ormconfig'
import { TEST_DATABASE_URL } from '../constants'

export const testConnection = async (reset = false) => {
  return await createConnection(ormconfig(TEST_DATABASE_URL, reset))
}
