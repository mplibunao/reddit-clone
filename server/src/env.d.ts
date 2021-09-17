declare namespace NodeJS {
  interface ProcessEnv {
    POSTGRES_USER: string;
    POSTGRES_PASSWORD: string;
    POSTGRES_DB: string;
    NODE_ENV: string;
    DATABASE_URL: string;
    GRAPH_API_HOST: string;
    NEXT_PUBLIC_GRAPH_API_HOST: string;
    NEXT_JS_HOST: string;
    REDIS_HOST: string;
    REDIS_URL: string;
    PORT: string;
    SESSION_SECRET: string;
  }
}