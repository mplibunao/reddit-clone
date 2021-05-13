import { MikroORM } from "@mikro-orm/core";
import {
  __prod__,
  __dbUrl__,
  __dbName__,
  __dbUser__,
  __dbPassword__,
} from "./constants";
import path from "path";

export default {
  migrations: {
    path: path.join(__dirname, "./migrations"),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
  entities: ["dist/entities/**/*.entity.js"],
  entitiesTs: ["src/**/*.entity.ts"],
  dbName: __dbName__,
  user: __dbUser__,
  password: __dbPassword__,
  debug: !__prod__,
  type: "postgresql",
  clientUrl: __dbUrl__,
} as Parameters<typeof MikroORM.init>[0];
