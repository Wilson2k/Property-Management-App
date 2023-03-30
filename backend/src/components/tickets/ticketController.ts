import { Response } from 'express';
import CustomRequest from '../../utils/request';
import * as TicketServices from './ticketServices';
import { TicketContext, TicketCreateContext } from './ticket';

const createNewTicket = async (
  req: CustomRequest<TicketCreateContext>,
  res: Response
) => {
  const ticketContext: TicketCreateContext = {
    ownerId: req.session.user,
    tenantId: +req.params.tenantid,
    propertyId: +req.params.propertyid,
    type: req.body.type,
    details: req.body.details,
  };
  const ticketData = await TicketServices.createNewTicketService(ticketContext);
  if (ticketData.status === 200 && ticketData.data !== undefined) {
    res.status(ticketData.status).send(ticketData.data);
  } else {
    res.status(ticketData.status).send(ticketData.message);
  }
};

const updateTicket = async (req: CustomRequest<TicketContext>, res: Response) => {
  const ticketContext: TicketContext = {
    id: +req.params.id,
    type: req.body.type,
    details: req.body.details,
    open: req.body.open,
    ownerId: req.session.user,
  };
  const ticketData = await TicketServices.updateTicketService(ticketContext);
  if (ticketData.status === 200 && ticketData.data !== undefined) {
    res.status(ticketData.status).send(ticketData.data);
  } else {
    res.status(ticketData.status).send(ticketData.message);
  }
};

const deleteTicket = async (req: CustomRequest<TicketContext>, res: Response) => {
  const ticketContext: TicketContext = {
    id: +req.params.id,
    ownerId: req.session.user,
  };
  const ticketData = await TicketServices.deleteTicketService(ticketContext);
  if (ticketData.status === 200 && ticketData.data !== undefined) {
    res.status(ticketData.status).send(ticketData.data);
  } else {
    res.status(ticketData.status).send(ticketData.message);
  }
};

const getTicketById = async (req: CustomRequest<TicketContext>, res: Response) => {
  const ticketContext: TicketContext = {
    id: +req.params.id,
    ownerId: req.session.user,
  };
  const ticketData = await TicketServices.getTicketByIdService(ticketContext);
  if (ticketData.status === 200 && ticketData.data !== undefined) {
    res.status(ticketData.status).send(ticketData.data);
  } else {
    res.status(ticketData.status).send(ticketData.message);
  }
};

const getTicketsByProperty = async (req: CustomRequest<TicketContext>, res: Response) => {
  const ticketContext: TicketContext = {
    ownerId: req.session.user,
    propertyId: +req.params.propertyid,
  };
  const ticketData = await TicketServices.getTicketsByPropertyService(ticketContext);
  if (ticketData.status === 200 && ticketData.data !== undefined) {
    res.status(ticketData.status).send(ticketData.data);
  } else {
    res.status(ticketData.status).send(ticketData.message);
  }
};

const getTicketsByTenant = async (req: CustomRequest<TicketContext>, res: Response) => {
  const ticketContext: TicketContext = {
    ownerId: req.session.user,
    tenantId: +req.params.tenantid,
  };
  const ticketData = await TicketServices.getTicketsByTenantService(ticketContext);
  if (ticketData.status === 200 && ticketData.data !== undefined) {
    res.status(ticketData.status).send(ticketData.data);
  } else {
    res.status(ticketData.status).send(ticketData.message);
  }
};

const getTicketsByUser = async (req: CustomRequest<TicketContext>, res: Response) => {
  const ticketContext: TicketContext = {
    ownerId: req.session.user,
  };
  const ticketData = await TicketServices.getTicketsByUserService(ticketContext);
  if (ticketData.status === 200 && ticketData.data !== undefined) {
    res.status(ticketData.status).send(ticketData.data);
  } else {
    res.status(ticketData.status).send(ticketData.message);
  }
};

const getOpenTickets = async (req: CustomRequest<TicketContext>, res: Response) => {
  const ticketContext: TicketContext = {
    ownerId: req.session.user,
  };
  const ticketData = await TicketServices.getOpenTicketsService(ticketContext);
  if (ticketData.status === 200 && ticketData.data !== undefined) {
    res.status(ticketData.status).send(ticketData.data);
  } else {
    res.status(ticketData.status).send(ticketData.message);
  }
};

const getClosedTickets = async (req: CustomRequest<TicketContext>, res: Response) => {
  const ticketContext: TicketContext = {
    ownerId: req.session.user,
  };
  const ticketData = await TicketServices.getClosedTicketsService(ticketContext);
  if (ticketData.status === 200 && ticketData.data !== undefined) {
    res.status(ticketData.status).send(ticketData.data);
  } else {
    res.status(ticketData.status).send(ticketData.message);
  }
};

export {
  createNewTicket,
  updateTicket,
  deleteTicket,
  getTicketById,
  getTicketsByProperty,
  getTicketsByTenant,
  getTicketsByUser,
  getOpenTickets,
  getClosedTickets,
};
