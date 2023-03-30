import { PrismaClient } from '@prisma/client';
import { TicketCreateContext, TicketUpdateInput } from './ticket';
const prisma = new PrismaClient();

const createNewTicket = async (userId: number, ticketContext: TicketCreateContext) => {
  const currentDate = new Date();
  const userInfo = { ownerId: userId };
  const ticketData = { ...ticketContext, ...userInfo, open: true, openDate: currentDate };
  const query = await prisma.ticket.create({
    data: ticketData,
  });
  return query;
};

const updateTicket = async (ticketId: number, ticketContext: TicketUpdateInput) => {
  // Open a closed ticket
  if (ticketContext.closeDate == null && ticketContext.open === true) {
    const query = await prisma.ticket.update({
      where: { id: ticketId },
      data: { ...ticketContext, closeDate: { set: null } },
    });
    return query;
  }
  const query = await prisma.ticket.update({
    where: { id: ticketId },
    data: ticketContext,
  });
  return query;
};

const deleteTicket = async (ticketId: number) => {
  const query = await prisma.ticket.delete({
    where: { id: ticketId },
  });
  return query;
};

const getTicketById = async (ticketId: number) => {
  const query = await prisma.ticket.findUnique({
    where: { id: ticketId },
  });
  return query;
};

const getTicketsByProperty = async (propertyId: number) => {
  const query = await prisma.ticket.findMany({
    where: {
      propertyId: propertyId,
    },
    orderBy: {
      openDate: 'asc',
    },
  });
  return query;
};

const getTicketsByTenant = async (tenantId: number) => {
  const query = await prisma.ticket.findMany({
    where: {
      tenantId: tenantId,
    },
    orderBy: {
      openDate: 'asc',
    },
  });
  return query;
};

const getTicketsByUser = async (userId: number) => {
  const query = await prisma.ticket.findMany({
    where: {
      ownerId: userId,
    },
    orderBy: {
      openDate: 'asc',
    },
  });
  return query;
};

const getOpenTickets = async (userId: number) => {
  const query = await prisma.ticket.findMany({
    where: {
      ownerId: userId,
      open: true,
    },
    orderBy: {
      openDate: 'asc',
    },
  });
  return query;
};

const getClosedTickets = async (userId: number) => {
  const query = await prisma.ticket.findMany({
    where: {
      ownerId: userId,
      open: false,
    },
    orderBy: {
      closeDate: 'asc',
    },
  });
  return query;
};

export {
  createNewTicket,
  updateTicket,
  deleteTicket,
  getTicketById,
  getTicketsByProperty,
  getTicketsByUser,
  getTicketsByTenant,
  getClosedTickets,
  getOpenTickets,
};
