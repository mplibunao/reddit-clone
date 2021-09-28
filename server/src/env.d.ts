declare namespace NodeJS {
  interface ProcessEnv {
    COMPOSE_PROJECT_NAME: string;
    DOCKER_RESTART_POLICY: string;
    NODE_ENV: string;
    PORT: string;
    NEXT_JS_HOST: string;
    SESSION_SECRET: string;
    POSTGRES_USER: string;
    POSTGRES_PASSWORD: string;
    POSTGRES_DB: string;
    POSTGRES_MULTIPLE_DATABASES: string;
    DATABASE_URL: string;
    TEST_DATABASE_URL: string;
    REDIS_URL: string;
    GRAPH_API_HOST: string;
    NEXT_PUBLIC_GRAPH_API_HOST: string;
  }
}