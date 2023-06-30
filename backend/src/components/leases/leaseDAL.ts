import { PrismaClient } from '@prisma/client';
import { LeaseCreateContext, LeaseUpdateInput } from './lease';
const prisma = new PrismaClient();

const createNewLease = async (userId: number, leaseContext: LeaseCreateContext) => {
  const userInfo = { ownerId: userId };
  const leaseData = { ...leaseContext, ...userInfo };
  const query = await prisma.lease.create({
    data: leaseData,
  });
  return query;
};

const updateLease = async (leaseId: number, leaseContext: LeaseUpdateInput) => {
  const query = await prisma.lease.update({
    where: { id: leaseId },
    data: leaseContext,
  });
  return query;
};

const deleteLease = async (leaseId: number) => {
  const query = await prisma.lease.delete({
    where: { id: leaseId },
  });
  return query;
};

const getLeaseById = async (leaseId: number) => {
  const query = await prisma.lease.findUnique({
    where: {
      id: leaseId,
    },
  });
  return query;
};

const getLeaseByPropertyTenant = async (tenantid: number, propertyid: number) => {
  const query = await prisma.lease.findUnique({
    where: {
      tenantId_propertyId: {
        tenantId: tenantid,
        propertyId: propertyid,
      },
    },
  });
  return query;
};

const getLeasesByMinRent = async (userId: number, minRent: number) => {
  const query = await prisma.lease.findMany({
    where: {
      ownerId: userId,
      monthlyRent: {
        gte: minRent,
      },
    },
    orderBy: {
      months: 'asc',
    },
  });
  return query;
};

const getLeasesByMaxRent = async (userId: number, maxRent: number) => {
  const query = await prisma.lease.findMany({
    where: {
      ownerId: userId,
      monthlyRent: {
        lte: maxRent,
      },
    },
    orderBy: {
      months: 'asc',
    },
  });
  return query;
};

const getLeaseByTimeToEndDate = async (userId: number, currentDate: Date) => {
  const query = await prisma.lease.findMany({
    where: {
      ownerId: userId,
      endDate: {
        gte: currentDate,
      },
    },
    orderBy: {
      endDate: 'asc',
    },
  });
  return query;
};

const getExpiredLeases = async (userId: number, currentDate: Date) => {
  const query = await prisma.lease.findMany({
    where: {
      ownerId: userId,
      endDate: {
        lte: currentDate,
      },
    },
    orderBy: {
      endDate: 'asc',
    },
  });
  return query;
};

const getLeasesByUser = async (userId: number) => {
  const query = await prisma.lease.findMany({
    where: {
      ownerId: userId,
    },
    orderBy: {
      months: 'asc',
    },
  });
  return query;
};

const getLeasesByTenant = async (userId: number, tenantId: number) => {
  const query = await prisma.lease.findMany({
    where: {
      ownerId: userId,
      tenantId: tenantId,
    },
    orderBy: {
      tenant: {
        lastName: 'asc',
      },
    },
  });
  return query;
};

const getLeasesByProperty = async (userId: number, propertyId: number) => {
  const query = await prisma.lease.findMany({
    where: {
      ownerId: userId,
      propertyId: propertyId,
    },
    orderBy: {
      property: {
        address: 'asc',
      },
    },
    include: {
      tenant: true
    }
  });
  return query;
};

export {
  getExpiredLeases,
  getLeaseById,
  getLeaseByTimeToEndDate,
  getLeasesByMinRent,
  getLeasesByMaxRent,
  getLeasesByProperty,
  getLeasesByTenant,
  getLeasesByUser,
  getLeaseByPropertyTenant,
  createNewLease,
  updateLease,
  deleteLease,
};
