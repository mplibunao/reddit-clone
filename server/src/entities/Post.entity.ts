import { Entity, Property, PrimaryKey, BaseEntity } from "@mikro-orm/core";
import { v4 } from "uuid";

@Entity()
export class Post extends BaseEntity<Post, "id"> {
  @PrimaryKey({ type: "uuid" })
  public id: string = v4();

  @Property()
  title!: string;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
