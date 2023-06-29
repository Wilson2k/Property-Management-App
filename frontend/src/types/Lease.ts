interface LeaseCreateContext {
    startDate: Date;
    endDate: Date;
    months: number;
    monthlyRent: number;
    tenantId: number;
    propertyId: number;
    ownerId?: string;
}

interface LeaseContext {
    id?: number;
    startDate?: Date;
    endDate?: Date;
    months?: number;
    monthlyRent?: number;
    tenantId?: number;
    propertyId?: number;
    ownerId?: string;
}

interface LeaseUpdateInput {
    startDate?: Date;
    endDate?: Date;
    months?: number;
    monthlyRent?: number;
}


export type {
    LeaseContext,
    LeaseCreateContext,
    LeaseUpdateInput,
};
