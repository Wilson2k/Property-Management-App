import axios from "axios";
import { AxiosError } from 'axios';
import * as UserTypes from '../types/User';
import * as PropertyTypes from '../types/Property'
import * as TenantTypes from '../types/Tenant'
import * as LeaseTypes from '../types/Lease'


const apiURL = process.env.NODE_ENV === "production" ? 'http://localhost/api/' : 'http://localhost:8080/api/';
const apiClient = axios.create({
  baseURL: apiURL,
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true
});

// User routes
const registerUser = async (newUser: UserTypes.UserRegisterContext) => {
  return await apiClient.post('/register', newUser).catch((error: AxiosError) => {
    return error.response;
  });
}

const loginUser = async (user: UserTypes.UserLoginContext) => {
  return await apiClient.post('/login', user).catch((error: AxiosError) => {
    return error.response;
  });
}

const logoutUser = async () => {
  return await apiClient.post('/logout').catch((error: AxiosError) => {
    return error.response;
  });
}

const getUser = async () => {
  return await apiClient.get('/profile').catch((error: AxiosError) => {
    return error.response;
  });
}

// Property routes
const getProperties = async () => {
  return await apiClient.get('/properties').catch((error: AxiosError) => {
    return error.response;
  });
}

const getProperty = async (propertyId: number) => {
  return await apiClient.get(`/property/${propertyId}`).catch((error: AxiosError) => {
    return error.response;
  });
}

const getPropertyIncome = async (propertyId: number) => {
  return await apiClient.get(`/property/${propertyId}/income`).catch((error: AxiosError) => {
    return error.response;
  });
}

const createProperty = async (newProperty: PropertyTypes.PropertyCreateContext) => {
  return await apiClient.post('/property/create', newProperty).catch((error: AxiosError) => {
    return error.response;
  });
}

const updateProperty = async (propertyId: number, newPropertyInfo: PropertyTypes.PropertyUpdateInput) => {
  return await apiClient.put(`/property/${propertyId}/update`, newPropertyInfo).catch((error: AxiosError) => {
    return error.response;
  });
}

const addPropertyTenant = async(propertyId: number, tenantId: number) => {
  return await apiClient.put(`/property/${propertyId}/add/${tenantId}`).catch((error: AxiosError) => {
    return error.response;
  });
}

const addPropertyMultTenants = async(propertyId: number, newTenants: PropertyTypes.PropertyContext) => {
  return await apiClient.put(`/property/${propertyId}/add_tenants`, newTenants).catch((error: AxiosError) => {
    return error.response;
  });
}

const getPropertyLeases = async(propertyId: number) => {
  return await apiClient.get(`/leases/property/${propertyId}`).catch((error: AxiosError) => {
    return error.response;
  });
}

const deleteProperty = async(propertyId: number) => {
  return await apiClient.delete(`/property/${propertyId}/delete`).catch((error: AxiosError) => {
    return error.response;
  });
}

// Tenant routes
const getTenants = async () => {
  return await apiClient.get('/tenants').catch((error: AxiosError) => {
    return error.response;
  });
}

const getTenant = async (tenantId: number) => {
  return await apiClient.get(`/tenant/${tenantId}`).catch((error: AxiosError) => {
    return error.response;
  });
}

const createTenant = async (newTenant: TenantTypes.TenantCreateContext) => {
  return await apiClient.post('/tenant/create', newTenant).catch((error: AxiosError) => {
    return error.response;
  });
}

const getTenantsByProperty = async(propertyId: number) => {
  return await apiClient.get(`/tenants/${propertyId}`).catch((error: AxiosError) => {
    return error.response;
  });
}

const getTenantsNotOnProperty = async(propertyId: number) => {
  return await apiClient.get(`/tenants/not/${propertyId}`).catch((error: AxiosError) => {
    return error.response;
  });
}

// Lease Routes
const getLeases = async () => {
  return await apiClient.get('/leases').catch((error: AxiosError) => {
    return error.response;
  });
}

const createLease = async (newLease: LeaseTypes.LeaseCreateContext) => {
  return await apiClient.post(`lease/create`, newLease).catch((error: AxiosError) => {
    return error.response;
  });
}

const getLease = async (leaseId: number) => {
  return await apiClient.get(`/lease/${leaseId}`).catch((error: AxiosError) => {
    return error.response;
  });
}

// Ticket Routes
const getTickets = async () => {
  return await apiClient.get('/tickets').catch((error: AxiosError) => {
    return error.response;
  });
}

const getTicket = async (ticketId: number) => {
  return await apiClient.get(`/lease/${ticketId}`).catch((error: AxiosError) => {
    return error.response;
  });
}

export {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  getProperties,
  createProperty,
  getProperty,
  getPropertyIncome,
  getPropertyLeases,
  deleteProperty,
  updateProperty,
  addPropertyTenant,
  addPropertyMultTenants,
  getTenant,
  getTenants,
  createTenant,
  getTenantsByProperty,
  getTenantsNotOnProperty,
  getLeases,
  getLease,
  createLease,
  getTickets,
  getTicket
}