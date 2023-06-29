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

export type {
    TicketContext,
    TicketCreateContext,
    TicketUpdateInput,
};
