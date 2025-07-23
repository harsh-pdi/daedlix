import { Migration } from '@mikro-orm/migrations';

export class Migration20250722134242 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create schema if not exists "pdi";`);
    this.addSql(`create table "pdi"."organization" ("id" bigserial primary key, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "name" varchar(255) not null);`);

    this.addSql(`create table "pdi"."action" ("id" bigserial primary key, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "name" text not null, "organization_id" bigint not null);`);

    this.addSql(`create table "pdi"."email_action" ("id" bigserial primary key, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "action_id" bigint not null);`);
    this.addSql(`alter table "pdi"."email_action" add constraint "email_action_action_id_unique" unique ("action_id");`);

    this.addSql(`alter table "pdi"."action" add constraint "action_organization_id_foreign" foreign key ("organization_id") references "pdi"."organization" ("id") on update cascade;`);

    this.addSql(`alter table "pdi"."email_action" add constraint "email_action_action_id_foreign" foreign key ("action_id") references "pdi"."action" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "pdi"."action" drop constraint "action_organization_id_foreign";`);

    this.addSql(`alter table "pdi"."email_action" drop constraint "email_action_action_id_foreign";`);

    this.addSql(`drop table if exists "pdi"."organization" cascade;`);

    this.addSql(`drop table if exists "pdi"."action" cascade;`);

    this.addSql(`drop table if exists "pdi"."email_action" cascade;`);

    this.addSql(`drop schema if exists "pdi";`);
  }

}
