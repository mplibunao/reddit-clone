export const __prod__ = process.env.NODE_ENV === 'production'
export const __dbUrl__ = process.env.DATABASE_URL
export const __dbName__ = process.env.POSTGRES_DB || 'lireddit'
export const __dbUser__ = process.env.POSTGRES_USER || 'postgres'
export const __dbPassword__ = process.env.POSTGRES_PASSWORD || 'postgres'
export const NEXT_JS_HOST = process.env.NEXT_JS_HOST
export const REDIS_HOST = process.env.REDIS_HOST
export const COOKIE_NAME = 'qid'
export const FORGET_PASSWORD_PREFIX = 'forget-password:'
