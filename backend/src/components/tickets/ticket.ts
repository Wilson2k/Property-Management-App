import { Ticket } from '@prisma/client';

interface TicketCreateContext {
  type: string;
  details: string;
  tenantId: number;
  propertyId: number;
  ownerId?: string;
}

interface TicketContext {
  id?: number;
  openDate?: Date;
  closeDate?: Date;
  type?: string;
  details?: string;
  open?: boolean;
  tenantId?: number;
  propertyId?: number;
  ownerId?: string;
}

interface TicketUpdateInput {
  type?: string;
  details?: string;
  open?: boolean;
  closeDate?: Date;
}

// Contexts for Ticket services
interface TicketReturnContext {
  status: number;
  data?: Ticket;
  aggregateData?: number;
  message: string;
}

interface MultTicketReturnContext {
  status: number;
  data?: Ticket[];
  message: string;
}

export {
  TicketReturnContext,
  TicketContext,
  TicketCreateContext,
  TicketUpdateInput,
  MultTicketReturnContext,
};
