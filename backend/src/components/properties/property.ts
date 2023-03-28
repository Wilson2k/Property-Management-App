import { Property, Prisma } from '@prisma/client';

const propertyIncludeAll = Prisma.validator<Prisma.PropertyInclude>()({
  leases: true,
  tenants: true,
});

type PropertyFullType = Prisma.PropertyGetPayload<{
  include: typeof propertyIncludeAll;
}>;

interface PropertyCreateContext {
  ownerId?: string;
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
  ownerId?: string;
  tenantId?: number;
}

interface PropertyTenantContext {
  ownerId?: string;
  tenantId?: string;
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
  aggregateData?: number;
  fullData?: PropertyFullType;
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
