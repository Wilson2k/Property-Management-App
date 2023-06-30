import { Lease, Prisma } from '@prisma/client';

const leaseIncludeTenant = Prisma.validator<Prisma.LeaseInclude>()({
  tenant: true,
});

type LeaseIncludeTenantType = Prisma.LeaseGetPayload<{
  include: typeof leaseIncludeTenant;
}>;

interface LeaseCreateContext {
  startDate: Date;
  endDate: Date;
  months: number;
  monthlyRent: number;
  tenantId: number;
  propertyId: number;
  ownerId?: string;
}

interface LeaseContext {
  id?: number;
  startDate?: Date;
  endDate?: Date;
  months?: number;
  monthlyRent?: number;
  tenantId?: number;
  propertyId?: number;
  ownerId?: string;
}

interface LeaseUpdateInput {
  startDate?: Date;
  endDate?: Date;
  months?: number;
  monthlyRent?: number;
}

// Contexts for Lease services
interface LeaseReturnContext {
  status: number;
  data?: Lease;
  aggregateData?: number;
  message: string;
}

interface MultLeaseReturnContext {
  status: number;
  data?: Lease[];
  tenantData?: LeaseIncludeTenantType[];
  message: string;
}

export {
  LeaseReturnContext,
  LeaseContext,
  LeaseCreateContext,
  LeaseUpdateInput,
  MultLeaseReturnContext,
};
