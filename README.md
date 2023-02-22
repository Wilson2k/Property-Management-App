
# Property Management App

Website for property owners to manage properties and tenants.

Frontend built with React TypeScript. Backend built with Node.js using Express sessions. Data persisted in a PostgreSQL database and managed using Prisma.


## Backend Installation

To run backebnd locally, make sure you have [Docker](https://www.docker.com/) installed and running on your machine.

First make an .env file to configure your local PostgreSQL database.

```bash
  cd backend
  touch .env
```

In your .env file, configure your [Prisma connection URL](https://www.prisma.io/docs/reference/database-reference/connection-urls) to your liking or leave as is.

```bash
DB_USER=postgres
DB_PASSWORD=postgrespw
DB_HOST=localhost
DB_PORT=5432
DB_NAME=testdb
DB_SCHEMA=test
DATABASE_URL="postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?schema=${DB_SCHEMA}"
```

Then to startup your local PostgreSQL database, and run the server

```bash
  npm install
  npm run migrate-dev
  npm run dev
```