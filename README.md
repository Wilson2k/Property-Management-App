
# Property Management App

Website for property owners to manage properties and tenants.

Frontend built with React TypeScript. Backend built with Node.js using Express sessions. Sessions are stored in memory using Redis. Data persisted in a PostgreSQL database and managed using Prisma.


## Backend Installation

To run backend locally, make sure you have [Docker](https://www.docker.com/) installed and running on your machine.

First make an .env file to configure your local PostgreSQL database and Redis server.

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
REDIS_PORT=6379
```

Then to startup your local PostgreSQL database and Redis server.

```bash
  npm install
  npm run migrate-dev
```

Finally, to run the app locally.

```bash
  npm run dev
```