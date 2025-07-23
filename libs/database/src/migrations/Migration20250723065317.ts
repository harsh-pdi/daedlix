import { Migration } from '@mikro-orm/migrations';

export class Migration20250723065317 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "pdi"."audience" ("id" bigserial primary key, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "organization_id" bigint not null, "url" varchar(255) not null);`);

    this.addSql(`create table "pdi"."action_audience" ("id" bigserial primary key, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "action_id" bigint not null, "audience_id" bigint not null);`);

    this.addSql(`alter table "pdi"."audience" add constraint "audience_organization_id_foreign" foreign key ("organization_id") references "pdi"."organization" ("id") on update cascade on delete cascade;`);

    this.addSql(`alter table "pdi"."action_audience" add constraint "action_audience_action_id_foreign" foreign key ("action_id") references "pdi"."action" ("id") on update cascade on delete cascade;`);
    this.addSql(`alter table "pdi"."action_audience" add constraint "action_audience_audience_id_foreign" foreign key ("audience_id") references "pdi"."audience" ("id") on update cascade on delete cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "pdi"."action_audience" drop constraint "action_audience_audience_id_foreign";`);

    this.addSql(`drop table if exists "pdi"."audience" cascade;`);

    this.addSql(`drop table if exists "pdi"."action_audience" cascade;`);
  }

}
