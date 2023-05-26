# Build container for backend
FROM node:lts-slim
WORKDIR /usr/src/app

# Install dependencies
COPY package.json .
COPY package-lock.json .
COPY .env .env
RUN npm ci
 
# Copy the application source
COPY . .

# Generate Prisma schema onto postgres
RUN npx prisma generate

# Expose port
EXPOSE 8080

# Generate and migrate Prisma Schema to Postgres
CMD sh ./startup.sh