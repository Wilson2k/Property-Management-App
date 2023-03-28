import { Tenant } from '@prisma/client';

interface PropertyConnectInput {
  connect: {
    id: number;
  };
}

interface TenantCreateContext {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  propertyId?: string;
  userId?: string;
}

interface TenantContext {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  userId?: string;
  propertyId?: number;
}

interface TenantUpdateInput {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
}

// Contexts for tenant services
interface TenantReturnContext {
  status: number;
  data?: Tenant;
  aggregateData?: number;
  message: string;
}

interface MultTenantReturnContext {
  status: number;
  data?: Tenant[];
  message: string;
}

export {
  TenantReturnContext,
  TenantContext,
  TenantCreateContext,
  TenantUpdateInput,
  MultTenantReturnContext,
  PropertyConnectInput,
};
