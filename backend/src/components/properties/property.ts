import { Property } from '@prisma/client';

interface PropertyIdContext {
    id: string;
}

interface PropertyLocationContext {
    location: string;
}

interface PropertyOwnerIdContext {
    ownerId: string;
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

export { PropertyIdContext, PropertyReturnContext, PropertyLocationContext, PropertyOwnerIdContext, MultPropertiesReturnContext }