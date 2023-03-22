import { PrismaClient } from '@prisma/client';
import { describe, expect, test, beforeAll, afterAll } from '@jest/globals';
import { seed } from '../../../seed';
import * as TenantServices from '../tenantServices';
import * as TenantContexts from '../tenant';

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

describe('Get user tenants', () => {
  test('Get tenant by id', async () => {
    const tenant: TenantContexts.TenantContext = {
      id: 203,
    };
    const tenantData = await TenantServices.getTenantByIdService(tenant);
    expect(tenantData.status).toBe(200);
    expect(tenantData.data?.firstName).toBe('bob');
  });

  test('Get tenant by email', async () => {
    const tenant: TenantContexts.TenantContext = {
      email: 'lotso@tenant.com',
    };
    const tenantData = await TenantServices.getTenantByEmailService(tenant);
    expect(tenantData.status).toBe(200);
    expect(tenantData.data?.firstName).toBe('lotso');
  });

  test('Get tenant by phone', async () => {
    const tenant: TenantContexts.TenantContext = {
      phone: '999-999-9999',
    };
    const tenantData = await TenantServices.getTenantByPhoneService(tenant);
    expect(tenantData.status).toBe(200);
    expect(tenantData.data?.firstName).toBe('bob');
  });
});

describe('Create a new tenant', () => {
  test('Create new tenant and attach to property', async () => {
    const tenant: TenantContexts.TenantCreateContext = {
      userId: userIds[1].toString(),
      propertyId: '2000',
      firstName: 'Billy',
      lastName: 'Jean',
      email: 'billyjean@mj.com',
      phone: '988-882-2223',
    };
    const newTenant = await TenantServices.createTenantService(tenant);
    expect(newTenant.status).toBe(200);
  });
});
