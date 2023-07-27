import { Prisma, PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
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

const removePropertyTenant = async (propertyId: number, tenantId: number) => {
  let retries = 0;
  while (retries < 5) {
    try {
      const [deletedLease, updateProperty] = await prisma.$transaction(
        [
          prisma.lease.deleteMany({
            where: {
              tenantId: tenantId,
              propertyId: propertyId,
            },
          }),
          prisma.property.update({
            where: { id: propertyId },
            data: {
              tenants: {
                disconnect: [{ id: tenantId }],
              },
            },
            include: {
              tenants: true,
              leases: true,
            },
          }),
        ],
        {
          isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
        }
      );
      if (deletedLease) {
        return updateProperty;
      }
    } catch (err: unknown) {
      if (err instanceof PrismaClientKnownRequestError && err.code === 'P2034') {
        retries++;
        continue;
      }
      throw err;
    }
  }
};

const addPropertyTenant = async (propertyId: number, tenantId: number) => {
  const query = await prisma.property.update({
    where: { id: propertyId },
    data: {
      tenants: {
        connect: [{ id: tenantId }],
      },
    },
    include: {
      tenants: true,
      leases: true,
    },
  });
  return query;
};

const addPropertyMultTenants = async (propertyId: number, tenantIds: number[]) => {
  const tenantIdInput = tenantIds.map((tenantId: number) => {
    return {
      id: tenantId
    };
  })
  const query = await prisma.property.update({
    where: { id: propertyId },
    data: {
      tenants: {
        connect: tenantIdInput,
      },
    },
    include: {
      tenants: true,
      leases: true,
    },
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

const getUserPropertiesByMinSize = async (ownerId: number, minSize: number) => {
  const query = await prisma.property.findMany({
    where: {
      ownerId: ownerId,
      size: {
        gte: minSize,
      },
    },
    orderBy: {
      size: 'asc',
    },
  });
  return query;
};

const getUserPropertiesByMaxSize = async (ownerId: number, maxSize: number) => {
  const query = await prisma.property.findMany({
    where: {
      ownerId: ownerId,
      size: {
        lte: maxSize,
      },
    },
    orderBy: {
      size: 'asc',
    },
  });
  return query;
};

const getUserPropertiesByTenant = async (ownerId: number, tenantId: number) => {
  const query = await prisma.property.findMany({
    where: {
      ownerId: ownerId,
      tenants: {
        some: {
          id: tenantId,
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

const getPropertyMonthlyIncome = async (propertyId: number) => {
  const query = await prisma.lease.aggregate({
    _sum: {
      monthlyRent: true,
    },
    where: {
      propertyId: propertyId,
    },
  });
  return query._sum.monthlyRent;
};

export {
  getAllProperties,
  getPropertyById,
  getPropertyByAddress,
  getPropertyMonthlyIncome,
  getAllUserProperties,
  getUserPropertiesByCity,
  getUserPropertiesByState,
  getUserPropertiesByType,
  getUserPropertiesByTenant,
  getUserOpenTicketProperties,
  createNewProperty,
  getUserPropertiesByMaxSize,
  getUserPropertiesByMinSize,
  updateProperty,
  removePropertyTenant,
  addPropertyTenant,
  addPropertyMultTenants,
  deleteProperty,
};
