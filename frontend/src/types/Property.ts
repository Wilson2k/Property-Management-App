interface PropertyCreateContext {
    ownerId?: string;
    address: string;
    city: string;
    state: string;
    type: string;
    size: number;
}

interface PropertyCreateForm {
    ownerId?: string;
    address: string;
    city: string;
    state: string;
    type: string;
    size: string;
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
    tenantIds?: number[];
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
    PropertyCreateForm,
    PropertyUpdateInput
}