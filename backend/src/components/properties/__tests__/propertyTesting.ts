import { PrismaClient } from '@prisma/client';
import { describe, expect, test, beforeAll } from '@jest/globals';
import { seed } from '../../../seed';
import * as PropertyServices from '../propertyService';
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
    const propertyData = await PropertyServices.getUserPropertiesService(properties);
    expect(propertyData.status).toBe(200);
    expect(propertyData.data?.length).toBe(2);
    expect(propertyData.data?.[0].address).toBe('123 Fake Street');
    expect(propertyData.data?.[0].size).toBe(200);
    expect(propertyData.data?.[0].ownerId).toBe(userIds[0]);
    expect(propertyData.data?.[1].address).toBe('123 Real Street');
    expect(propertyData.data?.[1].size).toBe(300);
    expect(propertyData.data?.[1].ownerId).toBe(userIds[0]);
  });

  test('Get property by id', async () => {
    const property: PropertyContexts.PropertyContext = {
      id: 2000,
    };
    const propertyData = await PropertyServices.getPropertyByIdService(property);
    expect(propertyData.status).toBe(200);
    expect(propertyData.data?.address).toBe('123 Mouse Street');
    expect(propertyData.data?.size).toBe(500);
    expect(propertyData.data?.type).toBe('Single Family');
    expect(propertyData.data?.ownerId).toBe(userIds[1]);
  });

  test('Get property by address', async () => {
    const property: PropertyContexts.PropertyContext = {
      address: '123 Dog Street',
      city: 'San Francisco',
      state: 'CA',
    };
    const propertyData = await PropertyServices.getPropertyByAddressService(property);
    expect(propertyData.status).toBe(200);
    expect(propertyData.data?.size).toBe(800);
    expect(propertyData.data?.type).toBe('Triplex');
    expect(propertyData.data?.ownerId).toBe(userIds[1]);
  });

  test('Get user properties by city', async () => {
    const properties: PropertyContexts.PropertyContext = {
      ownerId: userIds[1],
      city: 'San Francisco',
    };
    const propertyData = await PropertyServices.getUserPropertiesByCityService(
      properties
    );
    expect(propertyData.status).toBe(200);
    expect(propertyData.data?.length).toBe(2);
    expect(propertyData.data?.[0].address).toBe('123 Cat Street');
    expect(propertyData.data?.[1].address).toBe('123 Dog Street');
  });

  test('Get user properties by state', async () => {
    const properties: PropertyContexts.PropertyContext = {
      ownerId: userIds[1],
      state: 'CA',
    };
    const propertyData = await PropertyServices.getUserPropertiesByStateService(
      properties
    );
    expect(propertyData.status).toBe(200);
    expect(propertyData.data?.length).toBe(3);
    expect(propertyData.data?.[0].address).toBe('123 Cat Street');
    expect(propertyData.data?.[1].address).toBe('123 Dog Street');
    expect(propertyData.data?.[2].address).toBe('123 Mouse Street');
  });

  test('Get user properties by tenant', async () => {
    const properties: PropertyContexts.PropertyTenantContext = {
      ownerId: userIds[0],
      tenant: 'bob bill',
    };
    const propertyData = await PropertyServices.getUserPropertiesByTenantService(
      properties
    );
    expect(propertyData.status).toBe(200);
    expect(propertyData.data?.length).toBe(1);
    expect(propertyData.data?.[0].address).toBe('123 Fake Street');
  });

  test('Get user properties by type', async () => {
    const properties: PropertyContexts.PropertyContext = {
      ownerId: userIds[0],
      type: 'Single Family',
    };
    const propertyData = await PropertyServices.getUserPropertiesByTypeService(
      properties
    );
    expect(propertyData.status).toBe(200);
    expect(propertyData.data?.length).toBe(2);
    expect(propertyData.data?.[0].address).toBe('123 Fake Street');
    expect(propertyData.data?.[1].address).toBe('123 Real Street');
  });

  test('Get user properties by open tickets', async () => {
    const properties: PropertyContexts.PropertyContext = {
      ownerId: userIds[0],
    };
    const propertyData = await PropertyServices.getUserOpenTicketPropertiesService(
      properties
    );
    expect(propertyData.status).toBe(200);
    expect(propertyData.data?.length).toBe(1);
    expect(propertyData.data?.[0].address).toBe('123 Fake Street');
  });

  test('Get user properties when no open tickets', async () => {
    const properties: PropertyContexts.PropertyContext = {
      ownerId: userIds[1],
    };
    const propertyData = await PropertyServices.getUserOpenTicketPropertiesService(
      properties
    );
    expect(propertyData.status).toBe(200);
    expect(propertyData.data?.length).toBe(0);
  });
});

describe('Get User Properties bad input', () => {
  test('Get user properties bad id', async () => {
    const properties: PropertyContexts.PropertyContext = {
      ownerId: -1,
    };
    const propertyData = await PropertyServices.getUserPropertiesService(properties);
    expect(propertyData.status).toBe(422);
  });

  test('Get user properties bad tenant name', async () => {
    const properties: PropertyContexts.PropertyTenantContext = {
      ownerId: userIds[1],
      tenant: 'foobar',
    };
    const propertyData = await PropertyServices.getUserPropertiesByTenantService(
      properties
    );
    expect(propertyData.status).toBe(422);
    expect(propertyData.message).toBe('Bad tenant name');
  });
});

describe('Create Properties', () => {
  test('Create property for seed user, test duplicate', async () => {
    const properties: PropertyContexts.PropertyCreateContext = {
      ownerId: userIds[0].toString(),
      address: '321 Big Street',
      city: 'San Jose',
      state: 'CA',
      size: 5000,
      type: 'Apartment',
    };
    const propertyData = await PropertyServices.createPropertyService(properties);
    expect(propertyData.status).toBe(200);
    expect(propertyData.message).toBe('Property successfully created');

    const duplicate = await PropertyServices.createPropertyService(properties);
    expect(duplicate.status).toBe(409);
    expect(duplicate.message).toBe('Property already exists');
  });
});
