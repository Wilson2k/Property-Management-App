import { PrismaClient } from '@prisma/client';
import { describe, expect, test, beforeAll, afterAll } from '@jest/globals';
import { seed } from '../../../seed';
import * as LeaseServices from '../leaseServices';
import * as LeaseContexts from '../lease';
import { getPublicId } from '../../../utils/hashId';

const prisma = new PrismaClient();

let userIds: number[];
beforeAll(async () => {
  await seed()
    .then(async (ids) => {
      userIds = [...ids];
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
});

afterAll(async () => {
  await prisma.user.deleteMany({});
});

describe('Get Leases', () => {
  test('Get lease by id', async () => {
    const lease: LeaseContexts.LeaseContext = {
      id: 690,
      ownerId: getPublicId('user', userIds[0]),
    };
    const leaseData = await LeaseServices.getLeaseByIdService(lease);
    expect(leaseData.status).toBe(200);
  });

  test('Get leases by user', async () => {
    const lease: LeaseContexts.LeaseContext = {
      ownerId: getPublicId('user', userIds[0]),
    };
    const leaseData = await LeaseServices.getLeasesByUserService(lease);
    expect(leaseData.status).toBe(200);
    expect(leaseData.data?.length).toBe(2);
  });

  test('Get leases by tenant', async () => {
    const lease: LeaseContexts.LeaseContext = {
      tenantId: 203,
      ownerId: getPublicId('user', userIds[0]),
    };
    const leaseData = await LeaseServices.getLeasesByTenantService(lease);
    expect(leaseData.status).toBe(200);
    expect(leaseData.data?.length).toBe(1);
  });

  test('Get leases by property', async () => {
    const lease: LeaseContexts.LeaseContext = {
      propertyId: 3005,
      ownerId: getPublicId('user', userIds[0]),
    };
    const leaseData = await LeaseServices.getLeasesByPropertyService(lease);
    expect(leaseData.status).toBe(200);
    expect(leaseData.data?.length).toBe(2);
  });

  test('Get leases by min rent', async () => {
    const lease: LeaseContexts.LeaseContext = {
      monthlyRent: 2000,
      ownerId: getPublicId('user', userIds[0]),
    };
    const leaseData = await LeaseServices.getLeasesByMinRentService(lease);
    expect(leaseData.status).toBe(200);
    expect(leaseData.data?.length).toBe(0);
  });

  test('Get leases by max rent', async () => {
    const lease: LeaseContexts.LeaseContext = {
      monthlyRent: 200,
      ownerId: getPublicId('user', userIds[0]),
    };
    const leaseData = await LeaseServices.getLeasesByMaxRentService(lease);
    expect(leaseData.status).toBe(200);
    expect(leaseData.data?.length).toBe(1);
  });

  test('Get leases by max rent', async () => {
    const lease: LeaseContexts.LeaseContext = {
      monthlyRent: 200,
      ownerId: getPublicId('user', userIds[0]),
    };
    const leaseData = await LeaseServices.getLeasesByMaxRentService(lease);
    expect(leaseData.status).toBe(200);
    expect(leaseData.data?.length).toBe(1);
  });

  test('Get leases by time to end date', async () => {
    const lease: LeaseContexts.LeaseContext = {
      ownerId: getPublicId('user', userIds[0]),
    };
    const leaseData = await LeaseServices.getLeaseByTimeToEndDateService(lease);
    expect(leaseData.status).toBe(200);
    expect(leaseData.data?.length).toBe(1);
  });

  test('Get expired leases', async () => {
    const lease: LeaseContexts.LeaseContext = {
      ownerId: getPublicId('user', userIds[0]),
    };
    const leaseData = await LeaseServices.getExpiredLeasesService(lease);
    expect(leaseData.status).toBe(200);
    expect(leaseData.data?.length).toBe(1);
  });
});

describe('Create a lease', () => {
  test('Create a new lease', async () => {
    const lease: LeaseContexts.LeaseCreateContext = {
      ownerId: getPublicId('user', userIds[0]),
      tenantId: 205,
      propertyId: 3008,
      startDate: new Date('2023-03-18'),
      endDate: new Date('2023-06-18'),
      months: 3,
      monthlyRent: 1500.67,
    };
    const leaseData = await LeaseServices.createNewLeaseService(lease);
    expect(leaseData.status).toBe(200);
  });

  test('Get new lease', async () => {
    const lease: LeaseContexts.LeaseContext = {
      ownerId: getPublicId('user', userIds[0]),
      propertyId: 3008,
    };
    const leaseData = await LeaseServices.getLeasesByPropertyService(lease);
    expect(leaseData.status).toBe(200);
    expect(leaseData.data?.length).toBe(1);
    expect(leaseData.data?.[0].tenantId).toBe(205);
    expect(leaseData.data?.[0].months).toBe(3);
  });
});

describe('Update a lease', () => {
  test('Update a lease', async () => {
    const lease: LeaseContexts.LeaseContext = {
      ownerId: getPublicId('user', userIds[0]),
      id: 690,
      endDate: new Date('2023-09-01'),
    };
    const leaseData = await LeaseServices.updateLeaseService(lease);
    expect(leaseData.status).toBe(200);
  });

  test('Get updated lease', async () => {
    const lease: LeaseContexts.LeaseContext = {
      ownerId: getPublicId('user', userIds[0]),
      id: 690,
    };
    const leaseData = await LeaseServices.getLeaseByIdService(lease);
    expect(leaseData.status).toBe(200);
    expect(leaseData.data?.months).toBe(8);
  });
});

describe('Delete a lease', () => {
  test('Delete a lease', async () => {
    const lease: LeaseContexts.LeaseContext = {
      ownerId: getPublicId('user', userIds[0]),
      id: 690,
    };
    const leaseData = await LeaseServices.deleteLeaseService(lease);
    expect(leaseData.status).toBe(200);
  });

  test('Try to get deleted lease', async () => {
    const lease: LeaseContexts.LeaseContext = {
      ownerId: getPublicId('user', userIds[0]),
      id: 690,
    };
    const leaseData = await LeaseServices.getLeaseByIdService(lease);
    expect(leaseData.status).toBe(404);
  });
});