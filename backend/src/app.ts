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
app.post('/login', checkSession, validator('user'), asyncHandler(User.loginUser));
app.post('/register', checkSession, validator('user'), asyncHandler(User.registerUser));
app.get('/profile', checkSession, validator('user'), asyncHandler(User.getUser));
app.get(
  '/user/income',
  checkSession,
  validator('user'),
  asyncHandler(User.getUserIncome)
);
app.post('/logout', checkSession, validator('user'), asyncHandler(User.logoutUser));
app.put('/user/update', checkSession, validator('user'), asyncHandler(User.updateUser));
app.delete(
  '/user/delete',
  checkSession,
  validator('user'),
  asyncHandler(User.deleteUser)
);
// Property routes
app.post(
  '/property/create',
  checkSession,
  validator('property'),
  asyncHandler(Property.createNewUserProperty)
);
app.get(
  '/property/:id',
  checkSession,
  validator('property'),
  asyncHandler(Property.getPropertyById)
);
app.get(
  '/property/:id/income',
  checkSession,
  validator('property'),
  asyncHandler(Property.getPropertyIncomeById)
);
app.put(
  '/property/:id/update',
  checkSession,
  validator('property'),
  asyncHandler(Property.updateProperty)
);
app.put(
  '/property/:id/add/:tenantid',
  checkSession,
  validator('property'),
  asyncHandler(Property.addPropertyTenant)
);
app.put(
  '/property/:id/remove/:tenantid',
  checkSession,
  validator('property'),
  asyncHandler(Property.removePropertyTenant)
);
app.delete(
  '/property/:id/delete',
  checkSession,
  validator('property'),
  asyncHandler(Property.deleteUserProperty)
);
app.get(
  '/properties',
  checkSession,
  validator('property'),
  asyncHandler(Property.getAllUserProperties)
);
app.get(
  '/properties/address',
  checkSession,
  validator('property'),
  asyncHandler(Property.getPropertyByAddress)
);
app.get(
  '/properties/maxsize',
  checkSession,
  validator('property'),
  asyncHandler(Property.getUserPropertiesByMaxSize)
);
app.get(
  '/properties/minsize',
  checkSession,
  validator('property'),
  asyncHandler(Property.getUserPropertiesByMinSize)
);
app.get(
  '/properties/city',
  checkSession,
  validator('property'),
  asyncHandler(Property.getUserPropertiesByCity)
);
app.get(
  '/properties/state',
  checkSession,
  validator('property'),
  asyncHandler(Property.getUserPropertiesByState)
);
app.get(
  '/properties/type',
  checkSession,
  validator('property'),
  asyncHandler(Property.getUserPropertiesByType)
);
app.get(
  '/properties/:tenantid',
  checkSession,
  validator('property'),
  asyncHandler(Property.getUserPropertiesByTenant)
);
app.get(
  '/properties/opentickets',
  checkSession,
  validator('property'),
  asyncHandler(Property.getAllUserOpenTicketProperties)
);
// Tenant routes
app.post(
  '/tenant/create',
  checkSession,
  validator('tenant'),
  asyncHandler(Tenant.createTenant)
);
app.put(
  '/tenant/:id/update',
  checkSession,
  validator('tenant'),
  asyncHandler(Tenant.updateTenant)
);
app.delete(
  '/tenant/:id/delete',
  checkSession,
  validator('tenant'),
  asyncHandler(Tenant.deleteTenant)
);
app.get(
  '/tenant/:id',
  checkSession,
  validator('tenant'),
  asyncHandler(Tenant.getTenantById)
);
app.get(
  '/tenant/email',
  checkSession,
  validator('tenant'),
  asyncHandler(Tenant.getTenantByEmail)
);
app.get(
  '/tenant/phone',
  checkSession,
  validator('tenant'),
  asyncHandler(Tenant.getTenantByPhone)
);
app.get(
  '/tenants/:propertyid',
  checkSession,
  validator('tenant'),
  asyncHandler(Tenant.getTenantsByProperty)
);
app.get(
  '/tenants',
  checkSession,
  validator('tenant'),
  asyncHandler(Tenant.getTenantsByUser)
);
// Lease routes
app.post(
  '/lease/create/:tenantid/:propertyid',
  checkSession,
  validator('lease'),
  asyncHandler(Lease.createNewLease)
);
app.put(
  '/lease/:id/update',
  checkSession,
  validator('lease'),
  asyncHandler(Lease.updateLease)
);
app.delete(
  '/lease/:id/delete',
  validator('lease'),
  checkSession,
  asyncHandler(Lease.deleteLease)
);
app.get('/lease/:id', checkSession, validator('lease'), asyncHandler(Lease.getLeaseById));
app.get('/leases', checkSession, validator('lease'), asyncHandler(Lease.getLeasesByUser));
app.get(
  '/leases/minrent',
  checkSession,
  validator('lease'),
  asyncHandler(Lease.getLeasesByMinRent)
);
app.get(
  '/leases/maxrent',
  checkSession,
  validator('lease'),
  asyncHandler(Lease.getLeasesByMaxRent)
);
app.get(
  '/leases/time',
  checkSession,
  validator('lease'),
  asyncHandler(Lease.getLeaseByTimeToEndDate)
);
app.get(
  '/leases/expired',
  checkSession,
  validator('lease'),
  asyncHandler(Lease.getExpiredLeases)
);
app.get(
  '/leases/tenant/:tenantid',
  checkSession,
  validator('lease'),
  asyncHandler(Lease.getLeasesByTenant)
);
app.get(
  '/leases/property/:propertyid',
  checkSession,
  validator('lease'),
  asyncHandler(Lease.getLeasesByTenant)
);
// Ticket routes
app.post(
  '/ticket/create/:tenantid/:propertyid',
  checkSession,
  validator('ticket'),
  asyncHandler(Ticket.createNewTicket)
);
app.put(
  '/ticket/:id/update',
  checkSession,
  validator('ticket'),
  asyncHandler(Ticket.updateTicket)
);
app.delete(
  '/ticket/:id/delete',
  checkSession,
  validator('ticket'),
  asyncHandler(Ticket.deleteTicket)
);
app.get(
  '/ticket/:id',
  checkSession,
  validator('ticket'),
  asyncHandler(Ticket.getTicketById)
);
app.get(
  '/tickets',
  checkSession,
  validator('ticket'),
  asyncHandler(Ticket.getTicketsByUser)
);
app.get(
  '/tickets/property/:propertyid',
  checkSession,
  validator('ticket'),
  asyncHandler(Ticket.getTicketsByProperty)
);
app.get(
  '/tickets/tenant/:tenantid',
  checkSession,
  validator('ticket'),
  asyncHandler(Ticket.getTicketsByTenant)
);
app.get(
  '/tickets/closed',
  checkSession,
  validator('ticket'),
  asyncHandler(Ticket.getClosedTickets)
);
app.get(
  '/tickets/open',
  checkSession,
  validator('ticket'),
  asyncHandler(Ticket.getOpenTickets)
);

// 404 route
app.get('*', function (req, res) {
  res.status(404).send('Page not found');
});

export default app;
