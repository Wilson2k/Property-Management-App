import { Property } from '@prisma/client';

interface PropertyCreateContext {
  ownerId: string;
  address: string;
  city: string;
  state: string;
  type: string;
  size: string;
}

interface PropertyContext {
  id?: number;
  address?: string;
  city?: string;
  state?: string;
  type?: string;
  size?: string;
  ownerId?: number;
}

interface PropertyTenantContext {
  ownerId: number;
  tenant: string;
}

interface PropertyUpdateInput {
  address?: string;
  city?: string;
  state?: string;
  type?: string;
  size?: string;
}

// Contexts for property services
interface PropertyReturnContext {
  status: number;
  data?: Property;
  message: string;
}

interface MultPropertiesReturnContext {
  status: number;
  data?: Property[];
  message: string;
}

export {
  PropertyContext,
  PropertyTenantContext,
  PropertyReturnContext,
  PropertyCreateContext,
  PropertyUpdateInput,
  MultPropertiesReturnContext,
};
