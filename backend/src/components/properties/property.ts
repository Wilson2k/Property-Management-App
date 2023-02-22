import { Property } from "@prisma/client";

interface PropertyIdContext {
    id: string;
}

interface PropertyAddressContext {
    address: string;
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

export { PropertyIdContext, PropertyAddressContext ,PropertyReturnContext }