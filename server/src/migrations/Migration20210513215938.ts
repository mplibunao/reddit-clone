import { Migration } from "@mikro-orm/migrations";

export class Migration20210513215938 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "post" ("id" uuid not null, "title" text not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);'
    );
    this.addSql(
      'alter table "post" add constraint "post_pkey" primary key ("id");'
    );
  }
}
