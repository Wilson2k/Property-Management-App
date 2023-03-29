import { PrismaClient } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
import { LeaseCreateContext, LeaseUpdateInput } from './lease';
const prisma = new PrismaClient();

const createNewLease = async (leaseContext: LeaseCreateContext) => {
  const query = await prisma.lease.create({
    data: leaseContext,
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

const getLeasesByMinRent = async (userId: number, minRent: Decimal) => {
  const query = await prisma.lease.findMany({
    where: {
      ownerId: userId,
      monthlyRent: {
        gte: minRent,
      }
    },
    orderBy: {
      months: 'asc',
    }
  });
  return query;
};

const getLeasesByMaxRent = async (userId: number, maxRent: Decimal) => {
  const query = await prisma.lease.findMany({
    where: {
      ownerId: userId,
      monthlyRent: {
        lte: maxRent,
      }
    },
    orderBy: {
      months: 'asc',
    }
  });
  return query;
};

const getLeaseByTimeToEndDate = async (userId: number, currentDate: Date) => {
  const query = await prisma.lease.findMany({
    where: {
      ownerId: userId,
      endDate: {
        gte: currentDate,
      }
    },
    orderBy: {
      endDate: 'desc'
    }
  });
  return query;
};

const getExpiredLeases = async (userId: number, currentDate: Date) => {
  const query = await prisma.lease.findMany({
    where: {
      ownerId: userId,
      endDate: {
        lte: currentDate,
      }
    },
    orderBy: {
      endDate: 'asc'
    }
  });
  return query;
};

const getLeasesByUser = async (userId: number) => {
  const query = await prisma.lease.findMany({
    where: {
      ownerId: userId
    },
    orderBy: {
      months: 'asc',
    }
  });
  return query;
};

const getLeasesByTenant = async (userId: number, tenantId: number) => {
  const query = await prisma.lease.findMany({
    where: {
      ownerId: userId,
      tenantId: tenantId
    },
    orderBy: {
      tenant: {
        lastName: 'asc',
      }
    }
  });
  return query;
};

const getLeasesByProperty = async (userId: number, propertyId: number) => {
  const query = await prisma.lease.findMany({
    where: {
      ownerId: userId,
      propertyId: propertyId
    },
    orderBy: {
      property: {
        address: 'asc',
      }
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
  createNewLease,
  updateLease,
  deleteLease
};