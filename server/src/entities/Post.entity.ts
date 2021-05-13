import { Entity, Property, PrimaryKey, BaseEntity } from "@mikro-orm/core";
import { v4 } from "uuid";

@Entity()
export class Post extends BaseEntity<Post, "id"> {
  @PrimaryKey({ type: "uuid" })
  id: string = v4();

  @Property({ type: "text" })
  title!: string;

  @Property({ type: "date" })
  createdAt: Date = new Date();

  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
