interface PropertyCreateContext {
    ownerId?: string;
    address: string;
    city: string;
    state: string;
    type: string;
    size: number;
}

interface PropertyContext {
    id?: number;
    address?: string;
    city?: string;
    state?: string;
    type?: string;
    size?: number;
    ownerId?: string;
    tenantId?: number;
}

interface PropertyTenantContext {
    ownerId?: string;
    tenantId?: string;
}

interface PropertyUpdateInput {
    address?: string;
    city?: string;
    state?: string;
    type?: string;
    size?: number;
}

export type {
    PropertyCreateContext,
    PropertyContext,
    PropertyTenantContext,
    PropertyUpdateInput
}