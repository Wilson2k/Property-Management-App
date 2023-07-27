import axios from 'axios';
import { AxiosError, AxiosResponse } from 'axios';
import * as UserTypes from '../types/User';
import * as PropertyTypes from '../types/Property';
import * as TenantTypes from '../types/Tenant';
import * as LeaseTypes from '../types/Lease';
import * as TicketTypes from '../types/Ticket';

const apiURL =
  process.env.NODE_ENV === 'production'
    ? 'http://localhost/api/'
    : 'http://localhost:8080/api/';
const apiClient = axios.create({
  baseURL: apiURL,
  headers: {
    'Content-type': 'application/json',
  },
  withCredentials: true,
});

// User routes
const registerUser = async (
  newUser: UserTypes.UserRegisterContext
): Promise<AxiosResponse<UserTypes.UserContext | string> | undefined> => {
  return await apiClient
    .post<UserTypes.UserContext>('/register', newUser)
    .catch((error: AxiosError<string>) => {
      return error.response;
    });
};

const loginUser = async (user: UserTypes.UserLoginContext) => {
  return await apiClient.post('/login', user).catch((error: AxiosError) => {
    return error.response;
  });
};

const logoutUser = async (): Promise<
  AxiosResponse<UserTypes.UserContext | string> | undefined
> => {
  return await apiClient
    .post<UserTypes.UserContext>('/logout')
    .catch((error: AxiosError<string>) => {
      return error.response;
    });
};

const getUser = async (): Promise<
  AxiosResponse<UserTypes.UserContext | string> | undefined
> => {
  return await apiClient
    .get<UserTypes.UserContext>('/profile')
    .catch((error: AxiosError<string>) => {
      return error.response;
    });
};

// Property routes
const getProperties = async (): Promise<
  AxiosResponse<PropertyTypes.PropertyContext[] | string> | undefined
> => {
  return await apiClient
    .get<PropertyTypes.PropertyContext[]>('/properties')
    .catch((error: AxiosError<string>) => {
      return error.response;
    });
};

const getProperty = async (
  propertyId: number
): Promise<AxiosResponse<PropertyTypes.PropertyContext | string> | undefined> => {
  return await apiClient
    .get<PropertyTypes.PropertyContext>(`/property/${propertyId}`)
    .catch((error: AxiosError<string>) => {
      return error.response;
    });
};

const getPropertyIncome = async (
  propertyId: number
): Promise<AxiosResponse<number | string> | undefined> => {
  return await apiClient
    .get<number>(`/property/${propertyId}/income`)
    .catch((error: AxiosError<string>) => {
      return error.response;
    });
};

const createProperty = async (
  newProperty: PropertyTypes.PropertyCreateContext
): Promise<AxiosResponse<PropertyTypes.PropertyContext | string> | undefined> => {
  return await apiClient
    .post<PropertyTypes.PropertyContext>('/property/create', newProperty)
    .catch((error: AxiosError<string>) => {
      return error.response;
    });
};

const updateProperty = async (
  propertyId: number,
  newPropertyInfo: PropertyTypes.PropertyUpdateInput
): Promise<AxiosResponse<PropertyTypes.PropertyContext | string> | undefined> => {
  return await apiClient
    .put<PropertyTypes.PropertyContext>(`/property/${propertyId}/update`, newPropertyInfo)
    .catch((error: AxiosError<string>) => {
      return error.response;
    });
};

const addPropertyTenant = async (
  propertyId: number,
  tenantId: number
): Promise<AxiosResponse<PropertyTypes.PropertyContext | string> | undefined> => {
  return await apiClient
    .put<PropertyTypes.PropertyContext>(`/property/${propertyId}/add/${tenantId}`)
    .catch((error: AxiosError<string>) => {
      return error.response;
    });
};

const addPropertyMultTenants = async (
  propertyId: number,
  newTenants: { tenantIds: number[] }
): Promise<AxiosResponse<PropertyTypes.PropertyContext | string> | undefined> => {
  return await apiClient
    .put<PropertyTypes.PropertyContext>(`/property/${propertyId}/add_tenants`, newTenants)
    .catch((error: AxiosError<string>) => {
      return error.response;
    });
};

const getPropertyLeases = async (
  propertyId: number
): Promise<AxiosResponse<LeaseTypes.LeaseContext[] | string> | undefined> => {
  return await apiClient
    .get<LeaseTypes.LeaseContext[]>(`/leases/property/${propertyId}`)
    .catch((error: AxiosError<string>) => {
      return error.response;
    });
};

const deleteProperty = async (
  propertyId: number
): Promise<AxiosResponse<PropertyTypes.PropertyContext | string> | undefined> => {
  return await apiClient
    .delete<PropertyTypes.PropertyContext>(`/property/${propertyId}/delete`)
    .catch((error: AxiosError<string>) => {
      return error.response;
    });
};

// Tenant routes
const getTenants = async (): Promise<
  AxiosResponse<TenantTypes.TenantContext[] | string> | undefined
> => {
  return await apiClient
    .get<TenantTypes.TenantContext[]>('/tenants')
    .catch((error: AxiosError<string>) => {
      return error.response;
    });
};

const getTenant = async (
  tenantId: number
): Promise<AxiosResponse<TenantTypes.TenantContext | string> | undefined> => {
  return await apiClient
    .get<TenantTypes.TenantContext>(`/tenant/${tenantId}`)
    .catch((error: AxiosError<string>) => {
      return error.response;
    });
};

const createTenant = async (
  newTenant: TenantTypes.TenantCreateContext
): Promise<AxiosResponse<TenantTypes.TenantContext | string> | undefined> => {
  return await apiClient
    .post<TenantTypes.TenantContext>('/tenant/create', newTenant)
    .catch((error: AxiosError<string>) => {
      return error.response;
    });
};

const getTenantsByProperty = async (
  propertyId: number
): Promise<AxiosResponse<TenantTypes.TenantContext[] | string> | undefined> => {
  return await apiClient
    .get<TenantTypes.TenantContext[]>(`/tenants/${propertyId}`)
    .catch((error: AxiosError<string>) => {
      return error.response;
    });
};

const getTenantsNotOnProperty = async (
  propertyId: number
): Promise<AxiosResponse<TenantTypes.TenantContext[] | string> | undefined> => {
  return await apiClient
    .get<TenantTypes.TenantContext[]>(`/tenants/not/${propertyId}`)
    .catch((error: AxiosError<string>) => {
      return error.response;
    });
};

// Lease Routes
const getLeases = async (): Promise<
  AxiosResponse<LeaseTypes.LeaseContext[] | string> | undefined
> => {
  return await apiClient
    .get<LeaseTypes.LeaseContext[]>('/leases')
    .catch((error: AxiosError<string>) => {
      return error.response;
    });
};

const createLease = async (
  newLease: LeaseTypes.LeaseCreateContext
): Promise<AxiosResponse<LeaseTypes.LeaseContext | string> | undefined> => {
  return await apiClient
    .post<LeaseTypes.LeaseContext>(`lease/create`, newLease)
    .catch((error: AxiosError<string>) => {
      return error.response;
    });
};

const getLease = async (
  leaseId: number
): Promise<AxiosResponse<LeaseTypes.LeaseContext | string> | undefined> => {
  return await apiClient
    .get<LeaseTypes.LeaseContext>(`/lease/${leaseId}`)
    .catch((error: AxiosError<string>) => {
      return error.response;
    });
};

// Ticket Routes
const getTickets = async (): Promise<
  AxiosResponse<TicketTypes.TicketContext[] | string> | undefined
> => {
  return await apiClient
    .get<TicketTypes.TicketContext[]>('/tickets')
    .catch((error: AxiosError<string>) => {
      return error.response;
    });
};

const getTicket = async (
  ticketId: number
): Promise<AxiosResponse<TicketTypes.TicketContext | string> | undefined> => {
  return await apiClient
    .get<TicketTypes.TicketContext>(`/lease/${ticketId}`)
    .catch((error: AxiosError<string>) => {
      return error.response;
    });
};

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
  getTicket,
};
