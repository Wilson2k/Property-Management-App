import { PrismaClient } from '@prisma/client';
import { describe, expect, test, beforeAll, afterAll } from '@jest/globals';
import { seed } from '../../../seed';
import * as TicketServices from '../ticketServices';
import * as TicketContexts from '../ticket';
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

describe('Get Tickets', () => {
  test('Get ticket by id', async () => {
    const ticket: TicketContexts.TicketContext = {
      id: 709,
      ownerId: getPublicId('user', userIds[0]),
    };
    const ticketData = await TicketServices.getTicketByIdService(ticket);
    expect(ticketData.status).toBe(200);
    expect(ticketData.data?.open).toBe(true);
    expect(ticketData.data?.details).toBe('Broken heater');
  });

  test('Get tickets by property', async () => {
    const ticket: TicketContexts.TicketContext = {
      propertyId: 3005,
      ownerId: getPublicId('user', userIds[0]),
    };
    const ticketData = await TicketServices.getTicketsByPropertyService(ticket);
    expect(ticketData.status).toBe(200);
    expect(ticketData.data?.length).toBe(1);
  });

  test('Get tickets by tenant', async () => {
    const ticket: TicketContexts.TicketContext = {
      tenantId: 203,
      ownerId: getPublicId('user', userIds[0]),
    };
    const ticketData = await TicketServices.getTicketsByTenantService(ticket);
    expect(ticketData.status).toBe(200);
    expect(ticketData.data?.length).toBe(1);
  });

  test('Get tickets by user', async () => {
    const ticket: TicketContexts.TicketContext = {
      ownerId: getPublicId('user', userIds[0]),
    };
    const ticketData = await TicketServices.getTicketsByUserService(ticket);
    expect(ticketData.status).toBe(200);
    expect(ticketData.data?.length).toBe(1);
    expect(ticketData.data?.[0].details).toBe('Broken heater');
  });
  
  test('Get closed tickets', async () => {
    const ticket: TicketContexts.TicketContext = {
      ownerId: getPublicId('user', userIds[0]),
    };
    const ticketData = await TicketServices.getClosedTicketsService(ticket);
    expect(ticketData.status).toBe(200);
    expect(ticketData.data?.length).toBe(0);
  });

  test('Get open tickets', async () => {
    const ticket: TicketContexts.TicketContext = {
      ownerId: getPublicId('user', userIds[0]),
    };
    const ticketData = await TicketServices.getOpenTicketsService(ticket);
    expect(ticketData.status).toBe(200);
    expect(ticketData.data?.length).toBe(1);
    expect(ticketData.data?.[0].details).toBe('Broken heater');
  });
});

describe('Create a ticket', () => {
  test('Create a new ticket', async () => {
    const ticket: TicketContexts.TicketCreateContext = {
      ownerId: getPublicId('user', userIds[0]),
      type: 'Maintenance',
      details: 'Hole in the wall',
      tenantId: 205,
      propertyId: 3005
    };
    const ticketData = await TicketServices.createNewTicketService(ticket);
    expect(ticketData.status).toBe(200);
  });

  test('Get new ticket', async () => {
    const ticket: TicketContexts.TicketContext = {
      ownerId: getPublicId('user', userIds[0]),
      tenantId: 205,
    };
    const ticketData = await TicketServices.getTicketsByTenantService(ticket);
    expect(ticketData.status).toBe(200);
    expect(ticketData.data?.length).toBe(1);
    expect(ticketData.data?.[0].details).toBe('Hole in the wall');
  });
});

describe('Update a ticket', () => {
  test('Update a ticket', async () => {
    const ticket: TicketContexts.TicketContext = {
      id: 709,
      ownerId: getPublicId('user', userIds[0]),
      details: 'Water shut off',
      open: false,
    };
    const ticketData = await TicketServices.updateTicketService(ticket);
    expect(ticketData.status).toBe(200);
  });

  test('Get updated ticket', async () => {
    const ticket: TicketContexts.TicketContext = {
      ownerId: getPublicId('user', userIds[0]),
      id: 709,
    };
    const ticketData = await TicketServices.getTicketByIdService(ticket);
    expect(ticketData.status).toBe(200);
    expect(ticketData.data?.details).toBe('Water shut off')
    expect(ticketData.data?.open).toBe(false)
  });
});

describe('Delete a ticket', () => {
  test('Delete a ticket', async () => {
    const ticket: TicketContexts.TicketContext = {
      id: 709,
      ownerId: getPublicId('user', userIds[0]),
    };
    const ticketData = await TicketServices.deleteTicketService(ticket);
    expect(ticketData.status).toBe(200);
  });

  test('Try to get deleted ticket', async () => {
    const ticket: TicketContexts.TicketContext = {
      ownerId: getPublicId('user', userIds[0]),
      id: 709,
    };
    const ticketData = await TicketServices.getTicketByIdService(ticket);
    expect(ticketData.status).toBe(404);
  });
});
