import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

// Seed function returns array of ids of users for testing
export async function seed() {
  // Seed first user with two properties
  const hash1 = bcrypt.hashSync('nofires', 12);
  const user1 = await prisma.user.upsert({
    where: { email: 'smokey@bear.com' },
    update: {},
    create: {
      firstName: 'Smokey',
      lastName: 'BearDude',
      email: 'smokey@bear.com',
      password: hash1,
      properties: {
        create: [
          {
            id: 3005,
            address: '123 Fake Street',
            city: 'San Francisco',
            state: 'CA',
            type: 'Single Family',
            size: 200,
          },
          {
            id: 3008,
            address: '123 Real Street',
            city: 'San Francisco',
            state: 'CA',
            type: 'Single Family',
            size: 300,
          },
        ],
      },
    },
  });
  // Add two tenants to one property, each with one lease
  const prop1 = await prisma.property.findUnique({ where: { id: 3005 } });
  const prop2 = await prisma.property.findUnique({ where: { id: 3008 } });
  if (prop1 && prop2) {
    const tenant1 = await prisma.tenant.upsert({
      where: { email: 'bob@tenant.com' },
      update: {},
      create: {
        id: 203,
        firstName: 'bob',
        lastName: 'bill',
        email: 'bob@tenant.com',
        phone: '999-999-9999',
        userId: user1.id,
        properties: {
          connect: {
            id: prop1.id,
          },
        },
      },
    });
    const tenant2 = await prisma.tenant.upsert({
      where: { email: 'lotso@tenant.com' },
      update: {},
      create: {
        id: 205,
        firstName: 'lotso',
        lastName: 'sweets',
        email: 'lotso@tenant.com',
        phone: '999-111-9999',
        userId: user1.id,
        properties: {
          connect: {
            id: prop1.id,
          },
        },
      },
    });
    await prisma.ticket.create({
      data: {
        type: 'Maintenance',
        open: true,
        details: 'Broken heater',
        tenantId: tenant1.id,
        propertyId: prop1.id,
        openDate: new Date('1999-12-25T03:24:00'),
        ownerId: user1.id,
      },
    });
    await prisma.lease.createMany({
      data: [
        {
          startDate: new Date('2023-01-01T03:24:00'),
          endDate: new Date('2023-07-01T03:24:00'),
          monthlyRent: 900.87,
          months: 6,
          ownerId: user1.id,
          tenantId: tenant1.id,
          propertyId: prop1.id,
        },
        {
          startDate: new Date('2023-01-01T03:24:00'),
          endDate: new Date('2023-07-01T03:24:00'),
          monthlyRent: 100.13,
          months: 6,
          ownerId: user1.id,
          tenantId: tenant2.id,
          propertyId: prop1.id,
        },
      ],
    });
  }
  // Seed second user with three properties and no tenants
  const hash2 = bcrypt.hashSync('NoBears', 12);
  const user2 = await prisma.user.upsert({
    where: { email: 'wilson@nosmokey.com' },
    update: {},
    create: {
      id: 270,
      firstName: 'Wilson',
      lastName: 'Human',
      email: 'wilson@nosmokey.com',
      password: hash2,
      properties: {
        create: [
          {
            address: '123 Dog Street',
            city: 'San Francisco',
            state: 'CA',
            type: 'Triplex',
            size: 800,
          },
          {
            address: '123 Cat Street',
            city: 'San Francisco',
            state: 'CA',
            type: 'Apartment',
            size: 1600,
          },
          {
            id: 2000,
            address: '123 Mouse Street',
            city: 'San Jose',
            state: 'CA',
            type: 'Single Family',
            size: 500,
          },
        ],
      },
    },
  });
  return [user1.id, user2.id];
}
