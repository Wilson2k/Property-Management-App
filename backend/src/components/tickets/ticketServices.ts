import * as TicketDAL from './ticketDAL';
import * as TicketContexts from './ticket';
import { getTenantById } from '../tenants/tenantDAL';
import { getPropertyById } from '../properties/propertyDAL';
import { getDatabaseId } from '../../utils/hashId';

const createNewTicketService = async (
  ticketContext: TicketContexts.TicketCreateContext
) => {
  const ticketReturn: TicketContexts.TicketReturnContext = {
    message: 'Error creating ticket',
    status: 400,
  };
  const { ownerId, ...ticketInput } = { ...ticketContext };
  if (ownerId == null) {
    ticketReturn.message = 'Bad user id';
    ticketReturn.status = 422;
    return ticketReturn;
  }
  const userIdInput = Number(getDatabaseId('user', ownerId));
  if (isNaN(userIdInput) || userIdInput < 0) {
    ticketReturn.message = 'Invalid user id';
    ticketReturn.status = 422;
    return ticketReturn;
  }
  const tenantId = ticketInput.tenantId;
  const propertyId = ticketInput.propertyId;
  if (isNaN(tenantId) || tenantId < 0 || isNaN(propertyId) || propertyId < 0) {
    ticketReturn.message = 'Invalid ticket input';
    ticketReturn.status = 422;
    return ticketReturn;
  }
  const propertyRecord = await getPropertyById(propertyId);
  const tenantRecord = await getTenantById(tenantId);
  if (propertyRecord == null || tenantRecord == null) {
    ticketReturn.message = 'Property or tenant not found';
    ticketReturn.status = 404;
    return ticketReturn;
  }
  if (propertyRecord.ownerId != userIdInput || tenantRecord.userId != userIdInput) {
    ticketReturn.message = 'Not authorized to create ticket';
    ticketReturn.status = 401;
    return ticketReturn;
  }
  const newTicket = await TicketDAL.createNewTicket(userIdInput, ticketInput);
  if (newTicket != null) {
    ticketReturn.data = newTicket;
    ticketReturn.status = 200;
    ticketReturn.message = 'Ticket successfully created';
  }
  return ticketReturn;
};

const updateTicketService = async (ticketContext: TicketContexts.TicketContext) => {
  const ticketReturn: TicketContexts.TicketReturnContext = {
    message: 'Error updating ticket',
    status: 400,
  };
  if (ticketContext.id != null && ticketContext.ownerId != null) {
    const { id, ownerId, ...updateData } = ticketContext;
    const updateInput: TicketContexts.TicketUpdateInput = updateData;
    // Check valid ticket id
    const ticketId = +id;
    if (isNaN(ticketId) || ticketId < 0) {
      ticketReturn.message = 'Bad ticket id';
      ticketReturn.status = 422;
      return ticketReturn;
    }
    // Check that ticket exists
    const ticketRecord = await TicketDAL.getTicketById(ticketId);
    if (ticketRecord == null) {
      ticketReturn.message = 'Ticket not found';
      ticketReturn.status = 404;
      return ticketReturn;
    }
    // Check that user made ticket
    const user = Number(getDatabaseId('user', ownerId));
    if (ticketRecord.ownerId != user) {
      ticketReturn.message = 'Not authorized to update ticket';
      ticketReturn.status = 401;
      return ticketReturn;
    }
    if (
      updateInput.open != null ||
      updateInput.type != null ||
      updateInput.details != null
    ) {
      // Not opening or closing ticket
      if (updateInput.open == null || updateData.open === ticketRecord.open) {
        const updatedTicket = await TicketDAL.updateTicket(ticketId, updateInput);
        ticketReturn.message = 'Ticket updated';
        ticketReturn.data = updatedTicket;
        ticketReturn.status = 200;
        return ticketReturn;
      } else {
        // Open a closed ticket
        if (ticketRecord.open === false && updateInput.open === true) {
          updateInput.closeDate = undefined;
          const updatedTicket = await TicketDAL.updateTicket(ticketId, updateInput);
          ticketReturn.message = 'Ticket updated';
          ticketReturn.data = updatedTicket;
          ticketReturn.status = 200;
          return ticketReturn;
        }
        // Close an open ticket
        if (ticketRecord.open === true && updateInput.open === false) {
          updateInput.closeDate = new Date();
          const updatedTicket = await TicketDAL.updateTicket(ticketId, updateInput);
          ticketReturn.message = 'Ticket updated';
          ticketReturn.data = updatedTicket;
          ticketReturn.status = 200;
          return ticketReturn;
        }
      }
    } else {
      ticketReturn.message = 'No new data input';
      ticketReturn.status = 422;
    }
  }
  return ticketReturn;
};

const deleteTicketService = async (ticketContext: TicketContexts.TicketContext) => {
  const ticketReturn: TicketContexts.TicketReturnContext = {
    message: 'Error deleting ticket',
    status: 400,
  };
  if (ticketContext.id != null && ticketContext.ownerId != null) {
    const ticketId = +ticketContext.id;
    if (isNaN(ticketId) || ticketId < 0) {
      ticketReturn.message = 'Bad ticket id';
      ticketReturn.status = 422;
      return ticketReturn;
    }
    const ticketRecord = await TicketDAL.getTicketById(ticketId);
    if (ticketRecord == null) {
      ticketReturn.message = 'Ticket not found';
      ticketReturn.status = 404;
      return ticketReturn;
    }
    // Check that user made tenant
    const user = Number(getDatabaseId('user', ticketContext.ownerId));
    if (ticketRecord.ownerId != user) {
      ticketReturn.message = 'Not authorized to delete ticket';
      ticketReturn.status = 401;
      return ticketReturn;
    }
    const deleteTicket = await TicketDAL.deleteTicket(ticketId);
    if (deleteTicket != null) {
      ticketReturn.message = 'Ticket deleted';
      ticketReturn.data = deleteTicket;
      ticketReturn.status = 200;
    }
  }
  return ticketReturn;
};

const getTicketByIdService = async (ticketContext: TicketContexts.TicketContext) => {
  const ticketReturn: TicketContexts.TicketReturnContext = {
    message: 'Error getting ticket',
    status: 404,
  };
  if (ticketContext.id != null && ticketContext.ownerId != null) {
    const ticketId = +ticketContext.id;
    if (isNaN(ticketId) || ticketId < 0) {
      ticketReturn.status = 422;
      ticketReturn.message = 'Bad ticket id';
      return ticketReturn;
    }
    const ticketRecord = await TicketDAL.getTicketById(ticketId);
    const user = Number(getDatabaseId('user', ticketContext.ownerId));
    if (ticketRecord !== null) {
      if (ticketRecord.ownerId != user) {
        ticketReturn.status = 401;
        ticketReturn.message = 'Not authorized to get ticket';
        return ticketReturn;
      }
      ticketReturn.status = 200;
      ticketReturn.message = 'Ticket found';
      ticketReturn.data = ticketRecord;
      return ticketReturn;
    }
  }
  return ticketReturn;
};

const getTicketsByPropertyService = async (
  ticketContext: TicketContexts.TicketContext
) => {
  const ticketReturn: TicketContexts.MultTicketReturnContext = {
    message: 'Error getting tickets',
    status: 400,
  };
  if (ticketContext.propertyId != null && ticketContext.ownerId != null) {
    // Check valid property
    const propertyId = +ticketContext.propertyId;
    if (isNaN(propertyId) || propertyId < 0) {
      ticketReturn.status = 422;
      ticketReturn.message = 'Bad property id';
      return ticketReturn;
    }
    const propertyRecord = await getPropertyById(propertyId);
    if (propertyRecord == null) {
      ticketReturn.status = 404;
      ticketReturn.message = 'Property not found';
      return ticketReturn;
    }
    // Check property owned by user
    const user = Number(getDatabaseId('user', ticketContext.ownerId));
    if (propertyRecord.ownerId != user) {
      ticketReturn.status = 401;
      ticketReturn.message = 'Not authorized to get ticket';
      return ticketReturn;
    }
    const findTickets = await TicketDAL.getTicketsByProperty(propertyId);
    if (findTickets !== null) {
      ticketReturn.status = 200;
      ticketReturn.message = 'Property tickets found';
      ticketReturn.data = findTickets;
    }
  }
  return ticketReturn;
};

const getTicketsByUserService = async (ticketContext: TicketContexts.TicketContext) => {
  const ticketReturn: TicketContexts.MultTicketReturnContext = {
    message: 'Error getting tickets',
    status: 400,
  };
  if (ticketContext.ownerId != null) {
    // Check that ownerid string is valid
    const ownerId = Number(getDatabaseId('user', ticketContext.ownerId));
    if (isNaN(ownerId) || ownerId < 0) {
      ticketReturn.message = 'Bad owner ID';
      ticketReturn.status = 422;
      return ticketReturn;
    }
    const findTickets = await TicketDAL.getTicketsByUser(ownerId);
    if (findTickets !== null) {
      ticketReturn.status = 200;
      ticketReturn.message = 'Owner tickets found';
      ticketReturn.data = findTickets;
    }
  }
  return ticketReturn;
};

const getTicketsByTenantService = async (ticketContext: TicketContexts.TicketContext) => {
  const ticketReturn: TicketContexts.MultTicketReturnContext = {
    message: 'Error getting tickets',
    status: 400,
  };
  if (ticketContext.tenantId != null && ticketContext.ownerId != null) {
    // Check valid property
    const tenantId = +ticketContext.tenantId;
    if (isNaN(tenantId) || tenantId < 0) {
      ticketReturn.status = 422;
      ticketReturn.message = 'Bad tenant id';
      return ticketReturn;
    }
    const tenantRecord = await getTenantById(tenantId);
    if (tenantRecord == null) {
      ticketReturn.status = 404;
      ticketReturn.message = 'Tenant not found';
      return ticketReturn;
    }
    // Check tenant made by user
    const user = Number(getDatabaseId('user', ticketContext.ownerId));
    if (tenantRecord.userId != user) {
      ticketReturn.status = 401;
      ticketReturn.message = 'Not authorized to get tenant';
      return ticketReturn;
    }
    const findTickets = await TicketDAL.getTicketsByTenant(tenantId);
    if (findTickets !== null) {
      ticketReturn.status = 200;
      ticketReturn.message = 'Tenant tickets found';
      ticketReturn.data = findTickets;
    }
  }
  return ticketReturn;
};

const getClosedTicketsService = async (ticketContext: TicketContexts.TicketContext) => {
  const ticketReturn: TicketContexts.MultTicketReturnContext = {
    message: 'Error getting tickets',
    status: 400,
  };
  if (ticketContext.ownerId != null) {
    // Check that ownerid string is valid
    const ownerId = Number(getDatabaseId('user', ticketContext.ownerId));
    if (isNaN(ownerId) || ownerId < 0) {
      ticketReturn.message = 'Bad owner ID';
      ticketReturn.status = 422;
      return ticketReturn;
    }
    const findTickets = await TicketDAL.getClosedTickets(ownerId);
    if (findTickets !== null) {
      ticketReturn.status = 200;
      ticketReturn.message = 'Closed tickets found';
      ticketReturn.data = findTickets;
    }
  }
  return ticketReturn;
};

const getOpenTicketsService = async (ticketContext: TicketContexts.TicketContext) => {
  const ticketReturn: TicketContexts.MultTicketReturnContext = {
    message: 'Error getting tickets',
    status: 400,
  };
  if (ticketContext.ownerId != null) {
    // Check that ownerid string is valid
    const ownerId = Number(getDatabaseId('user', ticketContext.ownerId));
    if (isNaN(ownerId) || ownerId < 0) {
      ticketReturn.message = 'Bad owner ID';
      ticketReturn.status = 422;
      return ticketReturn;
    }
    const findTickets = await TicketDAL.getOpenTickets(ownerId);
    if (findTickets !== null) {
      ticketReturn.status = 200;
      ticketReturn.message = 'Open tickets found';
      ticketReturn.data = findTickets;
    }
  }
  return ticketReturn;
};

export {
  createNewTicketService,
  updateTicketService,
  deleteTicketService,
  getTicketByIdService,
  getTicketsByPropertyService,
  getTicketsByTenantService,
  getTicketsByUserService,
  getClosedTicketsService,
  getOpenTicketsService,
};
