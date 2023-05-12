#! /bin/sh
# Create/overwrite backend .env file
(cd backend &&
cat << EOF > .env &&
DB_USER=postgres
DB_PASSWORD=postgrespw
DB_HOST=localhost
DB_PORT=5432
DB_NAME=testdb
DB_SCHEMA=test
DATABASE_URL="postgresql://\${DB_USER}:\${DB_PASSWORD}@\${DB_HOST}:\${DB_PORT}/\${DB_NAME}?schema=\${DB_SCHEMA}"
REDIS_PORT=6379
EOF
# Install, setup, then run backend
npm install
npm run setup
npm start) &
# Create/overwrite frontend .env file
(cd frontend &&
cat << EOL > .env &&
REACT_APP_API_URL=http://localhost:8080/
REACT_APP_CLIENT_URL=http://localhost:3000/
EOL
# Install and start frontend
npm install
npm start
exec bash)