# Daedlix

## Description
Contact Matching POC

- Framework: Nest.js
- Database: PostgreSQL
- ORM: Mikro ORM
- API: REST

## Project setup

```bash
$ pnpm install
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
