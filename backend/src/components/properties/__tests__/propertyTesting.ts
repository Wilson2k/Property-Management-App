import { PrismaClient } from '@prisma/client';
import { describe, expect, test, beforeAll } from '@jest/globals';
import { seed } from '../../../seed';
import * as PropertServices from '../propertyService';
import * as PropertyContexts from '../property';

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

describe('Get User Properties', () => {
  test('Get seeded user properties', async () => {
    const properties: PropertyContexts.PropertyContext = {
      ownerId: userIds[0],
    };
    const propertyData = await PropertServices.getUserPropertiesService(properties);
    expect(propertyData.status).toBe(200);
    expect(propertyData.data?.length).toBe(1);
    expect(propertyData.data?.[0].address).toBe('123 Fake Street, San Franciso, CA');
  });
});
