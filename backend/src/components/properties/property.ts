import { Property, Tenant } from '@prisma/client';

interface PropertyCreateContext {
    address: string,
    city: string,
    state: string,
    type: string,
    size: string,
    tenants?: Tenant[],
}

interface PropertyContext {
    id?: string,
    address?: string,
    city?: string,
    state?: string,
    type?: string,
    size?: string,
    ownerId?: number,
    tenant?: string,
}

interface PropertyReturnContext {
    status: number,
    data?: Property,
    message: string,
}

interface MultPropertiesReturnContext {
    status: number,
    data?: Property[],
    message: string,
}

export { PropertyContext, PropertyReturnContext, PropertyCreateContext, MultPropertiesReturnContext }