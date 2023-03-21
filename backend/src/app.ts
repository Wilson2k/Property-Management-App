// Express setup
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import session from 'express-session';
import bodyParser from 'body-parser';
import asyncHandler from 'express-async-handler';
// Redis with ioredis
import Redis from 'ioredis';
import connectRedis from 'connect-redis';
// Routes and middleware
import * as User from './components/users/UserController';
import * as Property from './components/properties/propertyController';
import { checkSession } from './middleware/auth';

// Declaration merge to add user key to session object
declare module 'express-session' {
  interface SessionData {
    user: number;
  }
}

// Import env variables
dotenv.config();

const app = express();
const redisClient = new Redis();
const RedisStore = connectRedis(session);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());
app.use(
  session({
    store: new RedisStore({ host: '127.0.0.1', port: 6379, client: redisClient }),
    cookie: {
      // Set true on production
      secure: false,
      httpOnly: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
    resave: false,
    saveUninitialized: false,
    secret: 'secret',
  })
);

// User Routes
app.get('/', (req, res) => {res.send('Welcome to the property management app!')});
app.post('/login', asyncHandler(User.loginUser));
app.post('/register', asyncHandler(User.registerUser));
app.get('/profile', checkSession, asyncHandler(User.getUser));
app.post('/logout', checkSession, asyncHandler(User.logoutUser));
app.delete('/user/delete', checkSession, asyncHandler(User.deleteUser));
// Property routes
app.get('/properties', checkSession, asyncHandler(Property.getAllUserProperties));
app.post('/property/create', checkSession, asyncHandler(Property.createNewUserProperty));
app.get('/property/:id', checkSession, asyncHandler(Property.getPropertyById));
app.post('/property/:id/update', checkSession, asyncHandler(Property.updateProperty));
app.get('/properties/opentickets', checkSession, asyncHandler(Property.getAllUserOpenTicketProperties));

export default app;
