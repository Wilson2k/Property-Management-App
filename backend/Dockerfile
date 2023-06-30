# Build container for backend
FROM node:lts-slim
WORKDIR /usr/src/app

# Install dependencies
COPY package.json .
COPY package-lock.json .
RUN npm ci
 
# Copy the application source
COPY . .

RUN apt-get -qy update && apt-get -qy install openssl

# Generate Prisma schema onto postgres
RUN npx prisma generate

# Expose port
EXPOSE 8080

# Generate and migrate Prisma Schema to Postgres
CMD sh ./startup.sh