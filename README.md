# Daedlix

Contact Matching POC

- Framework: Nest.js
- Database: PostgreSQL
- ORM: Mikro ORM
- API: REST

## Project setup

```bash
# install dependencies
$ pnpm install

# setup env file
$ cp .env.example .env

# create postgres database
$ CREATE DATABASE daedlix;

# run migrations
$ pnpm run mikro-orm:up

# run project
$ pnpm run start:dev
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Formating

```bash
$ pnpm format
```

## Migrations

```bash
# create new migration on diff
$ pnpm run mikro-orm:create-migration

# Apply migration
$ pnpm run mikro-orm:up

# Reverse migration
$ pnpm run mikro-orm:down
```
