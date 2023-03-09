import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

// Seed function returns array of ids of users
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
            address: '123 Fake Street',
            city: 'San Francisco',
            state: 'CA',
            type: 'Single Family',
            size: 200,
          },
          {
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
  // Add a tenant and open a ticket on property 1 of first user
  const prop1 = await prisma.property.findFirst({
    where: {
      address: '123 Fake Street',
      city: 'San Francisco',
      state: 'CA',
    },
  });
  if (prop1) {
    const tenant1 = await prisma.tenant.upsert({
      where: { email: 'bob@tenant.com' },
      update: {},
      create: {
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
    await prisma.ticket.create({
      data: {
        type: 'Maintenance',
        open: true,
        details: 'Broken heater',
        tenantId: tenant1.id,
        propertyId: prop1.id,
        openDate: new Date('1999-12-25T03:24:00'),
      },
    });
  }
  // Seed second user with three properties and no tenants
  const hash2 = bcrypt.hashSync('NoBears', 12);
  const user2 = await prisma.user.upsert({
    where: { email: 'wilson@nosmokey.com' },
    update: {},
    create: {
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
