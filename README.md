
# Property Management App

Web app for property managers/owners to manage properties and tenants.

This app is containerized using [Docker](https://www.docker.com/), and built using the PERN stack.

The frontend is built with React TypeScript, and the backend is built using Node TypeScript.
Authentication through [Express Sessions](https://expressjs.com/en/resources/middleware/session.html) stored in memory with [Redis](https://redis.io). 
Data is persisted in a PostgreSQL database using [Prisma](https://www.prisma.io/) ORM.

## Quickstart

To run the app locally, make sure you have [Docker](https://www.docker.com/) installed and running on your machine.

Then run the command below in your terminal.

```bash
  docker compose up -d
```

Then go to localhost on any browser on your machine.

## Backend Testing

Unit tests written, need to mock Prisma client.

## Frontend Testing

Coming soon.

## E2E Tests

Coming soon.