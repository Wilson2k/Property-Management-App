
# Property Management App

Web app for property managers/owners to manage properties and tenants.

This app is containerized using [Docker](https://www.docker.com/). Frontend is built with React TypeScript. Backend built with Node TypeScript using Express sessions. Sessions are stored in memory using Redis. Data persisted in a PostgreSQL database and managed using [Prisma](https://www.prisma.io/).

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