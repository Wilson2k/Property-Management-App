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
import * as User from './components/users/userController';
import * as Property from './components/properties/propertyController';
import * as Tenant from './components/tenants/tenantController';
import * as Lease from './components/leases/leaseController';
import * as Ticket from './components/tickets/ticketController';
import { checkSession } from './middleware/auth';
import { validator } from './middleware/validator';

// Declaration merge to add user key to session object
declare module 'express-session' {
  interface SessionData {
    user: string;
  }
}

// Import env variables
dotenv.config();

const app = express();
const redisClient = new Redis(6379, `${process.env.REDIS_HOST}`);
const RedisStore = connectRedis(session);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors({
  credentials: true,
  origin: true,
}));
app.use(
  session({
    store: new RedisStore({ host: `${process.env.REDIS_HOST}`, port: 6379, client: redisClient }),
    cookie: {
      // Set true on production
      secure: false,
      httpOnly: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
    resave: false,
    saveUninitialized: false,
    // Place secret somewhere else in prod
    secret: 'secret',
  })
);

// Home page
app.get('/api', (req, res) => {
  res.send('Welcome to the property management app!');
});
// User Routes
app.post('/api/login', checkSession, validator('user'), asyncHandler(User.loginUser));
app.post('/api/register', checkSession, validator('user'), asyncHandler(User.registerUser));
app.get('/api/profile', checkSession, validator('user'), asyncHandler(User.getUser));
app.get(
  '/api/user/income',
  checkSession,
  validator('user'),
  asyncHandler(User.getUserIncome)
);
app.post('/api/logout', checkSession, validator('user'), asyncHandler(User.logoutUser));
app.put('/api/user/update', checkSession, validator('user'), asyncHandler(User.updateUser));
app.delete(
  '/api/user/delete',
  checkSession,
  validator('user'),
  asyncHandler(User.deleteUser)
);
// Property routes
app.post(
  '/api/property/create',
  checkSession,
  validator('property'),
  asyncHandler(Property.createNewUserProperty)
);
app.get(
  '/api/property/:id',
  checkSession,
  validator('property'),
  asyncHandler(Property.getPropertyById)
);
app.get(
  '/api/property/:id/income',
  checkSession,
  validator('property'),
  asyncHandler(Property.getPropertyIncomeById)
);
app.put(
  '/api/property/:id/update',
  checkSession,
  validator('property'),
  asyncHandler(Property.updateProperty)
);
app.put(
  '/api/property/:id/add/:tenantid',
  checkSession,
  validator('property'),
  asyncHandler(Property.addPropertyTenant)
);
app.put(
  '/api/property/:id/add_tenants',
  checkSession,
  validator('property'),
  asyncHandler(Property.addPropertyTenants)
);
app.put(
  '/api/property/:id/remove/:tenantid',
  checkSession,
  validator('property'),
  asyncHandler(Property.removePropertyTenant)
);
app.delete(
  '/api/property/:id/delete',
  checkSession,
  validator('property'),
  asyncHandler(Property.deleteUserProperty)
);
app.get(
  '/api/properties',
  checkSession,
  validator('property'),
  asyncHandler(Property.getAllUserProperties)
);
app.get(
  '/api/properties/address',
  checkSession,
  validator('property'),
  asyncHandler(Property.getPropertyByAddress)
);
app.get(
  '/api/properties/maxsize',
  checkSession,
  validator('property'),
  asyncHandler(Property.getUserPropertiesByMaxSize)
);
app.get(
  '/api/properties/minsize',
  checkSession,
  validator('property'),
  asyncHandler(Property.getUserPropertiesByMinSize)
);
app.get(
  '/api/properties/city',
  checkSession,
  validator('property'),
  asyncHandler(Property.getUserPropertiesByCity)
);
app.get(
  '/api/properties/state',
  checkSession,
  validator('property'),
  asyncHandler(Property.getUserPropertiesByState)
);
app.get(
  '/api/properties/type',
  checkSession,
  validator('property'),
  asyncHandler(Property.getUserPropertiesByType)
);
app.get(
  '/api/properties/:tenantid',
  checkSession,
  validator('property'),
  asyncHandler(Property.getUserPropertiesByTenant)
);
app.get(
  '/api/properties/opentickets',
  checkSession,
  validator('property'),
  asyncHandler(Property.getAllUserOpenTicketProperties)
);
// Tenant routes
app.post(
  '/api/tenant/create',
  checkSession,
  validator('tenant'),
  asyncHandler(Tenant.createTenant)
);
app.put(
  '/api/tenant/:id/update',
  checkSession,
  validator('tenant'),
  asyncHandler(Tenant.updateTenant)
);
app.delete(
  '/api/tenant/:id/delete',
  checkSession,
  validator('tenant'),
  asyncHandler(Tenant.deleteTenant)
);
app.get(
  '/api/tenant/:id',
  checkSession,
  validator('tenant'),
  asyncHandler(Tenant.getTenantById)
);
app.get(
  '/api/tenant/email',
  checkSession,
  validator('tenant'),
  asyncHandler(Tenant.getTenantByEmail)
);
app.get(
  '/api/tenant/phone',
  checkSession,
  validator('tenant'),
  asyncHandler(Tenant.getTenantByPhone)
);
app.get(
  '/api/tenants/:propertyid',
  checkSession,
  validator('tenant'),
  asyncHandler(Tenant.getTenantsByProperty)
);
app.get(
  '/api/tenants/not/:propertyid',
  checkSession,
  validator('tenant'),
  asyncHandler(Tenant.getTenantsByNotProperty)
);
app.get(
  '/api/tenants',
  checkSession,
  validator('tenant'),
  asyncHandler(Tenant.getTenantsByUser)
);
// Lease routes
app.post(
  '/api/lease/create/:tenantid/:propertyid',
  checkSession,
  validator('lease'),
  asyncHandler(Lease.createNewLease)
);
app.put(
  '/api/lease/:id/update',
  checkSession,
  validator('lease'),
  asyncHandler(Lease.updateLease)
);
app.delete(
  '/api/lease/:id/delete',
  validator('lease'),
  checkSession,
  asyncHandler(Lease.deleteLease)
);
app.get('/api/lease/:id', checkSession, validator('lease'), asyncHandler(Lease.getLeaseById));
app.get('/api/leases', checkSession, validator('lease'), asyncHandler(Lease.getLeasesByUser));
app.get(
  '/api/leases/minrent',
  checkSession,
  validator('lease'),
  asyncHandler(Lease.getLeasesByMinRent)
);
app.get(
  '/api/leases/maxrent',
  checkSession,
  validator('lease'),
  asyncHandler(Lease.getLeasesByMaxRent)
);
app.get(
  '/api/leases/time',
  checkSession,
  validator('lease'),
  asyncHandler(Lease.getLeaseByTimeToEndDate)
);
app.get(
  '/api/leases/expired',
  checkSession,
  validator('lease'),
  asyncHandler(Lease.getExpiredLeases)
);
app.get(
  '/api/leases/tenant/:tenantid',
  checkSession,
  validator('lease'),
  asyncHandler(Lease.getLeasesByTenant)
);
app.get(
  '/api/leases/property/:propertyid',
  checkSession,
  validator('lease'),
  asyncHandler(Lease.getLeasesByTenant)
);
// Ticket routes
app.post(
  '/api/ticket/create/:tenantid/:propertyid',
  checkSession,
  validator('ticket'),
  asyncHandler(Ticket.createNewTicket)
);
app.put(
  '/api/ticket/:id/update',
  checkSession,
  validator('ticket'),
  asyncHandler(Ticket.updateTicket)
);
app.delete(
  '/api/ticket/:id/delete',
  checkSession,
  validator('ticket'),
  asyncHandler(Ticket.deleteTicket)
);
app.get(
  '/api/ticket/:id',
  checkSession,
  validator('ticket'),
  asyncHandler(Ticket.getTicketById)
);
app.get(
  '/api/tickets',
  checkSession,
  validator('ticket'),
  asyncHandler(Ticket.getTicketsByUser)
);
app.get(
  '/api/tickets/property/:propertyid',
  checkSession,
  validator('ticket'),
  asyncHandler(Ticket.getTicketsByProperty)
);
app.get(
  '/api/tickets/tenant/:tenantid',
  checkSession,
  validator('ticket'),
  asyncHandler(Ticket.getTicketsByTenant)
);
app.get(
  '/api/tickets/closed',
  checkSession,
  validator('ticket'),
  asyncHandler(Ticket.getClosedTickets)
);
app.get(
  '/api/tickets/open',
  checkSession,
  validator('ticket'),
  asyncHandler(Ticket.getOpenTickets)
);

// 404 route
app.get('*', function (req, res) {
  res.status(404).send('Page not found');
});

export default app;
