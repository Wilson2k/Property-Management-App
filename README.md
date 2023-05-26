
# Property Management App

Web app for property managers/owners to manage properties and tenants.

This app is containerized using [Docker](https://www.docker.com/). Frontend is built with React TypeScript. Backend built with Node TypeScript using Express sessions. Sessions are stored in memory using Redis. Data persisted in a PostgreSQL database and managed using [Prisma](https://www.prisma.io/).

## Quickstart

To run the app locally, make sure you have [Docker](https://www.docker.com/) installed and running on your machine.

Then run the command below in your terminal.

```bash
  docker compose up -d
```

## Backend Setup

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

Make sure you have [Docker](https://www.docker.com/)  running on your current machine. Then to startup your local PostgreSQL database and Redis server on Docker.

```bash
  npm install
  npm run setup
```

Finally, to run the server locally.

```bash
  npm start
```

## Frontend Setup

To setup the frontend locally, make an .env file to configure the port the frontend client will run on.

```bash
  cd frontend
  touch .env
```

In your .env file, configure the port the API and client will run on to your liking.

```bash
REACT_APP_API_URL=http://localhost:8080/
REACT_APP_CLIENT_URL=http://localhost:3000/
```

Then to run the frontend client locally.

```bash
  npm install
  npm start
```
