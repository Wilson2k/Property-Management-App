import { PrismaClient } from '@prisma/client';
import { PropertyCreateContext, PropertyUpdateInput } from './property';
const prisma = new PrismaClient();

const createNewProperty = async (
  userId: number,
  propertyContext: PropertyCreateContext
) => {
  const userInfo = { ownerId: userId };
  const propertyData = { ...propertyContext, ...userInfo };
  const query = await prisma.property.create({
    data: propertyData,
  });
  return query;
};

const updateProperty = async (
  propertyId: number,
  propertyContext: PropertyUpdateInput
) => {
  const query = await prisma.property.update({
    where: { id: propertyId },
    data: propertyContext,
  });
  return query;
};

const deleteProperty = async (propertyId: number) => {
  const query = await prisma.property.delete({
    where: { id: propertyId },
  });
  return query;
};

const getAllProperties = async () => {
  const query = await prisma.property.findMany();
  return query;
};

const getPropertyById = async (propertyId: number) => {
  const query = await prisma.property.findUnique({
    where: {
      id: propertyId,
    },
  });
  return query;
};

const getPropertyByAddress = async (
  propertyAddress: string,
  propertyCity: string,
  propertyState: string
) => {
  const query = await prisma.property.findFirst({
    where: {
      address: propertyAddress,
      city: propertyCity,
      state: propertyState,
    },
  });
  return query;
};

const getUserPropertiesByCity = async (ownerId: number, propertyCity: string) => {
  const query = await prisma.property.findMany({
    where: {
      ownerId: ownerId,
      city: propertyCity,
    },
    orderBy: {
      address: 'asc',
    },
  });
  return query;
};

const getUserPropertiesByState = async (ownerId: number, propertyState: string) => {
  const query = await prisma.property.findMany({
    where: {
      ownerId: ownerId,
      state: propertyState,
    },
    orderBy: {
      address: 'asc',
    },
  });
  return query;
};

const getUserPropertiesByType = async (ownerId: number, propertyType: string) => {
  const query = await prisma.property.findMany({
    where: {
      ownerId: ownerId,
      type: propertyType,
    },
    orderBy: {
      address: 'asc',
    },
  });
  return query;
};

const getUserPropertiesByTenant = async (
  ownerId: number,
  tenantFname: string,
  tenantLname: string
) => {
  const query = await prisma.property.findMany({
    where: {
      ownerId: ownerId,
      tenants: {
        some: {
          firstName: tenantFname,
          lastName: tenantLname,
        },
      },
    },
    orderBy: {
      address: 'asc',
    },
  });
  return query;
};

const getAllUserProperties = async (ownerId: number) => {
  const query = await prisma.property.findMany({
    where: {
      ownerId: ownerId,
    },
    orderBy: {
      address: 'asc',
    },
  });
  return query;
};

const getUserOpenTicketProperties = async (ownerId: number) => {
  const query = await prisma.property.findMany({
    where: {
      ownerId: ownerId,
      tickets: {
        some: {
          open: true,
        },
      },
    },
    orderBy: {
      address: 'asc',
    },
  });
  return query;
};

export {
  getAllProperties,
  getPropertyById,
  getPropertyByAddress,
  getAllUserProperties,
  getUserPropertiesByCity,
  getUserPropertiesByState,
  getUserPropertiesByType,
  getUserPropertiesByTenant,
  getUserOpenTicketProperties,
  createNewProperty,
  updateProperty,
  deleteProperty,
};
