import { PrismaClient } from '@prisma/client';
import { describe, expect, test, beforeAll, afterAll } from '@jest/globals';
import { seed } from '../../../seed';
import * as PropertyServices from '../propertyService';
import * as PropertyContexts from '../property';
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

describe('Get User Properties', () => {
  test('Get seeded user properties', async () => {
    const properties: PropertyContexts.PropertyContext = {
      ownerId: getPublicId('user', userIds[0]),
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
      ownerId: getPublicId('user', userIds[1]),
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
      ownerId: getPublicId('user', userIds[1]),
    };
    const propertyData = await PropertyServices.getPropertyByAddressService(property);
    expect(propertyData.status).toBe(200);
    expect(propertyData.data?.size).toBe(800);
    expect(propertyData.data?.type).toBe('Triplex');
    expect(propertyData.data?.ownerId).toBe(userIds[1]);
  });

  test('Get user properties by city', async () => {
    const properties: PropertyContexts.PropertyContext = {
      ownerId: getPublicId('user', userIds[1]),
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
      ownerId: getPublicId('user', userIds[1]),
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
      ownerId: getPublicId('user', userIds[0]),
      tenantId: '203',
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
      ownerId: getPublicId('user', userIds[0]),
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
      ownerId: getPublicId('user', userIds[0]),
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
      ownerId: getPublicId('user', userIds[1]),
    };
    const propertyData = await PropertyServices.getUserOpenTicketPropertiesService(
      properties
    );
    expect(propertyData.status).toBe(200);
    expect(propertyData.data?.length).toBe(0);
  });
});

describe('Get Property income', () => {
  test('Get property monthly income', async () => {
    const property: PropertyContexts.PropertyContext = {
      id: 3005,
      ownerId: getPublicId('user', userIds[0]),
    };
    const propertyData = await PropertyServices.getPropertyIncomeService(property);
    expect(propertyData.status).toBe(200);
    expect(propertyData.aggregateData).toBe(1001.0);
  });

  test('Get property monthly income', async () => {
    const property2: PropertyContexts.PropertyContext = {
      id: 3008,
      ownerId: getPublicId('user', userIds[0]),
    };
    const propertyData2 = await PropertyServices.getPropertyIncomeService(property2);
    expect(propertyData2.status).toBe(200);
    expect(propertyData2.aggregateData).toBe(0);
  });
});

describe('Get User Properties bad input', () => {
  test('Get user properties bad id', async () => {
    const properties: PropertyContexts.PropertyContext = {
      ownerId: 'foobar',
    };
    const propertyData = await PropertyServices.getUserPropertiesService(properties);
    expect(propertyData.status).toBe(422);
  });

  test('Get user properties bad tenant name', async () => {
    const properties: PropertyContexts.PropertyTenantContext = {
      ownerId: getPublicId('user', userIds[1]),
      tenantId: 'foobar',
    };
    const propertyData = await PropertyServices.getUserPropertiesByTenantService(
      properties
    );
    expect(propertyData.status).toBe(422);
    expect(propertyData.message).toBe('Bad tenant id');
  });
});

describe('Create Property and test duplicate', () => {
  test('Create property', async () => {
    const property: PropertyContexts.PropertyCreateContext = {
      ownerId: getPublicId('user', userIds[0]),
      address: '321 Big Street',
      city: 'San Jose',
      state: 'CA',
      size: 5000,
      type: 'Apartment',
    };
    const propertyData = await PropertyServices.createPropertyService(property);
    expect(propertyData.status).toBe(200);
    expect(propertyData.message).toBe('Property successfully created');

    const duplicate = await PropertyServices.createPropertyService(property);
    expect(duplicate.status).toBe(409);
    expect(duplicate.message).toBe('Property already exists');
  });

  test('Test create duplicate property', async () => {
    const property: PropertyContexts.PropertyCreateContext = {
      ownerId: getPublicId('user', userIds[0]),
      address: '321 Big Street',
      city: 'San Jose',
      state: 'CA',
      size: 5000,
      type: 'Apartment',
    };
    const duplicate = await PropertyServices.createPropertyService(property);
    expect(duplicate.status).toBe(409);
    expect(duplicate.message).toBe('Property already exists');
  });
});

describe('Update Properties', () => {
  test('Invalid update property', async () => {
    const property: PropertyContexts.PropertyContext = {
      id: 2000,
      ownerId: getPublicId('user', userIds[1]),
      address: '1234 Mouse Street',
      city: 'San Jose',
    };
    const propertyData = await PropertyServices.updatePropertyService(property);
    expect(propertyData.status).toBe(400);
  });

  test('Duplicate update property', async () => {
    const property: PropertyContexts.PropertyContext = {
      id: 2000,
      ownerId: getPublicId('user', userIds[1]),
      address: '123 Fake Street',
      city: 'San Francisco',
      state: 'CA',
    };
    const propertyData = await PropertyServices.updatePropertyService(property);
    expect(propertyData.status).toBe(409);
  });

  test('Update user property', async () => {
    const property: PropertyContexts.PropertyContext = {
      id: 2000,
      ownerId: getPublicId('user', userIds[1]),
      address: '1234 Mouse Street',
      city: 'San Jose',
      state: 'CA',
      size: 980,
      type: 'Apartment',
    };
    const propertyData = await PropertyServices.updatePropertyService(property);
    expect(propertyData.status).toBe(200);
    expect(propertyData.message).toBe('Property updated');
  });

  test('Get updated property', async () => {
    const property: PropertyContexts.PropertyContext = {
      id: 2000,
      ownerId: getPublicId('user', userIds[1]),
    };
    const propertyData = await PropertyServices.getPropertyByIdService(property);
    expect(propertyData.status).toBe(200);
    expect(propertyData.data?.address).toBe('1234 Mouse Street');
  });
});

describe('Update Property Tenant', () => {
  test('Add Tenant to Property', async () => {
    const property: PropertyContexts.PropertyContext = {
      id: 3008,
      tenantId: 203,
      ownerId: getPublicId('user', userIds[0]),
    };
    const propertyData = await PropertyServices.addPropertyTenantService(property);
    expect(propertyData.status).toBe(200);
    expect(propertyData.fullData?.leases?.length).toBe(0);
    expect(propertyData.fullData?.tenants?.length).toBe(1);
  });

  test('Remove Tenant From Property', async () => {
    const property: PropertyContexts.PropertyContext = {
      id: 3008,
      tenantId: 203,
      ownerId: getPublicId('user', userIds[0]),
    };
    const propertyData = await PropertyServices.removePropertyTenantService(property);
    expect(propertyData.status).toBe(200);
    expect(propertyData.fullData?.leases?.length).toBe(0);
    expect(propertyData.fullData?.tenants?.length).toBe(0);
  });
});

describe('Delete Property', () => {
  test('Delete user property', async () => {
    const property: PropertyContexts.PropertyContext = {
      id: 2000,
      ownerId: getPublicId('user', userIds[1]),
    };
    const propertyData = await PropertyServices.deletePropertyService(property);
    expect(propertyData.status).toBe(200);
    expect(propertyData.message).toBe('Property deleted');
  });

  test('Get deleted property', async () => {
    const property: PropertyContexts.PropertyContext = {
      id: 2000,
    };
    const propertyData = await PropertyServices.getPropertyByIdService(property);
    expect(propertyData.status).toBe(404);
  });
});
