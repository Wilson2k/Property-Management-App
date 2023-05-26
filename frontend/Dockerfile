# Build container for frontend
FROM node:lts-slim as build
WORKDIR /usr/src/app

# Install dependencies
COPY package.json .
COPY package-lock.json .
RUN npm ci
 
# Copy the application source
COPY . .

# Build react app
RUN npm run build

# Server react app on port 3000 using nginx
FROM nginx:stable-alpine
 
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/build /usr/share/nginx/html
 
EXPOSE 3000