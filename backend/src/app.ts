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
import * as Tenant from './components/tenants/tenantController';
import { checkSession } from './middleware/auth';

// Declaration merge to add user key to session object
declare module 'express-session' {
  interface SessionData {
    user: string;
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

// Home page
app.get('/', (req, res) => {
  res.send('Welcome to the property management app!');
});
// User Routes
app.post('/login', asyncHandler(User.loginUser));
app.post('/register', asyncHandler(User.registerUser));
app.get('/profile', checkSession, asyncHandler(User.getUser));
app.get('/user/income', checkSession, asyncHandler(User.getUserIncome));
app.post('/logout', checkSession, asyncHandler(User.logoutUser));
app.put('/user/update', checkSession, asyncHandler(User.updateUser));
app.delete('/user/delete', checkSession, asyncHandler(User.deleteUser));
// Property routes
app.post('/property/create', checkSession, asyncHandler(Property.createNewUserProperty));
app.get('/property/:id', checkSession, asyncHandler(Property.getPropertyById));
app.get('/property/:id/income',checkSession,asyncHandler(Property.getPropertyIncomeById));
app.put('/property/:id/update', checkSession, asyncHandler(Property.updateProperty));
app.put('/property/:id/add/:tenantid', checkSession, asyncHandler(Property.addPropertyTenant));
app.put('/property/:id/remove/:tenantid', checkSession, asyncHandler(Property.removePropertyTenant));
app.delete('/property/:id/delete',checkSession,asyncHandler(Property.deleteUserProperty));
app.get('/properties', checkSession, asyncHandler(Property.getAllUserProperties));
app.get('/properties/address', checkSession, asyncHandler(Property.getPropertyByAddress));
app.get('/properties/maxsize',checkSession,asyncHandler(Property.getUserPropertiesByMaxSize));
app.get('/properties/minsize',checkSession,asyncHandler(Property.getUserPropertiesByMinSize));
app.get('/properties/city', checkSession, asyncHandler(Property.getUserPropertiesByCity));
app.get('/properties/state',checkSession,asyncHandler(Property.getUserPropertiesByState));
app.get('/properties/type', checkSession, asyncHandler(Property.getUserPropertiesByType));
app.get('/properties/:tenantid',checkSession,asyncHandler(Property.getUserPropertiesByTenant));
app.get('/properties/opentickets',checkSession,asyncHandler(Property.getAllUserOpenTicketProperties));
// Tenant routes
app.post('/tenant/create', checkSession, asyncHandler(Tenant.createTenant));
app.put('/tenant/:id/update', checkSession, asyncHandler(Tenant.createTenant));
app.delete('/tenant/:id/delete', checkSession, asyncHandler(Tenant.deleteTenant));
app.get('/tenant/:id', checkSession, asyncHandler(Tenant.getTenantById))
app.get('/tenant/email', checkSession, asyncHandler(Tenant.getTenantByEmail))
app.get('/tenant/phone', checkSession, asyncHandler(Tenant.getTenantByPhone))
app.get('/tenants/:propertyid', checkSession, asyncHandler(Tenant.getTenantsByProperty))
// Lease routes

// 404 route
app.get('*', function (req, res) {
  res.status(404).send('Page not found');
});

export default app;
