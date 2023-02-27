import { Property } from '@prisma/client';

interface PropertyContext {
    id?: string,
    address?: string,
    city?: string,
    state?: string,
    type?: string,
    size?: string,
    ownerId?: number,
}

interface PropertyReturnContext {
    status: number;
    data?: Property;
    message: string;
}

interface MultPropertiesReturnContext {
    status: number;
    data?: Property[];
    message: string;
}

export { PropertyContext, PropertyReturnContext, MultPropertiesReturnContext }