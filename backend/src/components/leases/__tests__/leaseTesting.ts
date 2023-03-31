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
});
