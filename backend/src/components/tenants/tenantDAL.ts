import { PrismaClient } from '@prisma/client';
import { TenantCreateContext, PropertyConnectInput, TenantUpdateInput } from './tenant';
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

const updateTenant = async (tenantId: number, tenantContext: TenantUpdateInput) => {
  const query = await prisma.tenant.update({
    where: { id: tenantId },
    data: tenantContext,
  });
  return query;
};

const deleteTenant = async (tenantId: number) => {
  const query = await prisma.tenant.delete({
    where: {
      id: tenantId,
    },
  });
  return query;
};

const getTenantById = async (tenantId: number) => {
  const query = await prisma.tenant.findUnique({
    where: {
      id: tenantId,
    },
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

const getTenantByPhone = async (tenantPhone: string) => {
  const query = await prisma.tenant.findUnique({
    where: {
      phone: tenantPhone,
    },
  });
  return query;
};

const getTenantsByProperty = async (propertyId: number) => {
  const query = await prisma.tenant.findMany({
    where: {
      properties: {
        some: {
          id: propertyId,
        },
      },
    },
  });
  return query;
};

export {
  createNewTenant,
  getTenantByEmail,
  getTenantsByProperty,
  getTenantById,
  updateTenant,
  deleteTenant,
  getTenantByPhone,
};
