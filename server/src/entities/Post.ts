import { Entity, Property, PrimaryKey } from "@mikro-orm/core";
import { v4 } from "uuid";

@Entity()
export class Book {
  @PrimaryKey()
  uuid: string = v4();

  @Property()
  title!: string;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
