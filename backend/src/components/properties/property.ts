import { Property } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';

interface PropertyCreateContext {
  ownerId: string;
  address: string;
  city: string;
  state: string;
  type: string;
  size: number;
}

interface PropertyContext {
  id?: number;
  address?: string;
  city?: string;
  state?: string;
  type?: string;
  size?: number;
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
  size?: number;
}

// Contexts for property services
interface PropertyReturnContext {
  status: number;
  data?: Property;
  aggregateData?: Decimal;
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
