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
    expect(propertyData.data?.[0].address).toBe('123 Fake Street');
    expect(propertyData.data?.[0].size).toBe('200 sqft');
    expect(propertyData.data?.[0].ownerId).toBe(userIds[0]);
  });

  test('Get property by address', async () => {
    const property: PropertyContexts.PropertyContext = {
      address: '123 Dog Street',
      city: 'San Francisco',
      state: 'CA',
    };
    const propertyData = await PropertServices.getPropertyByAddressService(property);
    expect(propertyData.status).toBe(200);
    expect(propertyData.data?.size).toBe('800 sqft');
    expect(propertyData.data?.type).toBe('Triplex');
    expect(propertyData.data?.ownerId).toBe(userIds[1]);
  });

  test('Get property by id', async () => {
    const property: PropertyContexts.PropertyContext = {
      id: 2000,
    };
    const propertyData = await PropertServices.getPropertyByIdService(property);
    expect(propertyData.status).toBe(200);
    expect(propertyData.data?.address).toBe('123 Mouse Street');
    expect(propertyData.data?.size).toBe('500 sqft');
    expect(propertyData.data?.type).toBe('Single Family');
    expect(propertyData.data?.ownerId).toBe(userIds[1]);
  });

  test('Get user properties by city', async () => {
    const properties: PropertyContexts.PropertyContext = {
      ownerId: userIds[1],
      city: 'San Francisco',
    };
    const propertyData = await PropertServices.getUserPropertiesByCityService(properties);
    expect(propertyData.status).toBe(200);
    expect(propertyData.data?.length).toBe(2);
    expect(propertyData.data?.[0].address).toBe('123 Cat Street');
  });

  test('Get user properties by tenant', async () => {
    const properties: PropertyContexts.PropertyTenantContext = {
      ownerId: userIds[0],
      tenant: 'bob bill',
    };
    const propertyData = await PropertServices.getUserPropertiesByTenantService(
      properties
    );
    expect(propertyData.status).toBe(200);
    expect(propertyData.data?.length).toBe(1);
    expect(propertyData.data?.[0].address).toBe('123 Fake Street');
  });
});

describe('Get User Properties bad input', () => {
  test('Get user properties bad id', async () => {
    const properties: PropertyContexts.PropertyContext = {
      ownerId: -1,
    };
    const propertyData = await PropertServices.getUserPropertiesService(properties);
    expect(propertyData.status).toBe(422);
  });

  test('Get user properties bad tenant name', async () => {
    const properties: PropertyContexts.PropertyTenantContext = {
      ownerId: userIds[1],
      tenant: 'foobar',
    };
    const propertyData = await PropertServices.getUserPropertiesByTenantService(
      properties
    );
    expect(propertyData.status).toBe(422);
    expect(propertyData.message).toBe('Bad tenant name');
  });
});
