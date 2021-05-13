import { MikroORM } from "@mikro-orm/core";
import { __prod__, __dbUrl__, __dbName__, __dbUser__ } from "./constants";
//import { Post } from "./entities";
import config from "./mikro-orm.config";

const main = async () => {
  //console.log("config", config); // eslint-disable-line no-console
  const orm = await MikroORM.init(config);
  console.log("connected ---------------");

  //const post = orm.em.create(Post, { title: "my first post" });
  //await orm.em.persistAndFlush(post);
  //console.log("---sql2----");
  //await orm.em.nativeInsert(Post, { title: "my first post 2" });
};

main().catch((err) => {
  console.log("err", err); // eslint-disable-line no-console
});
