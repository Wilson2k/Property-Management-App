import axios from "axios";
import { AxiosError } from 'axios';
import * as UserTypes from '../types/User';
import * as PropertyTypes from '../types/Property'

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
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

const getTenantsByProperty = async(propertyId: number) => {
  return await apiClient.get(`/tenants/${propertyId}`).catch((error: AxiosError) => {
    return error.response;
  });
}

// Leease Routes
const getLeases = async () => {
  return await apiClient.get('/leases').catch((error: AxiosError) => {
    return error.response;
  });
}

// Ticket Routes
const getTickets = async () => {
  return await apiClient.get('/tickets').catch((error: AxiosError) => {
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
  updateProperty,
  getTenant,
  getTenants,
  getTenantsByProperty,
  getLeases,
  getTickets
}