import { PrismaClient } from '@prisma/client';
import { TenantCreateContext, PropertyConnectInput } from './tenant';
const prisma = new PrismaClient();

const createNewTenant = async (
  ownerId: number,
  propertyId: PropertyConnectInput,
  tenantContext: TenantCreateContext
) => {
  const userInfo = { userId: ownerId };
  const propertyInfo = { properties: propertyId };
  const tenantData = { ...tenantContext, ...userInfo, ...propertyInfo };
  const query = await prisma.tenant.create({
    data: tenantData,
  });
  return query;
};

const getTenantByEmail = async (tenantEmail: string) => {
  const query = await prisma.tenant.findUnique({
    where: {
      email: tenantEmail,
    },
  });
  return query;
};

export { createNewTenant, getTenantByEmail };
