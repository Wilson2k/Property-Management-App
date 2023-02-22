import { PrismaClient } from '@prisma/client'
import { PropertyIdContext, PropertyAddressContext } from './property';
const prisma = new PrismaClient()

const getPropertyById = async (propertyContext: PropertyIdContext) => {
    const propertyId = +propertyContext.id;
    const query = await prisma.property.findUnique({
        where: {
            id: propertyId,
        }
    });
    return query;
}

const getPropertyByAddress = async (propertyContext: PropertyAddressContext) => {
    const query = await prisma.property.findUnique({
        where: {
            address: propertyContext.address,
        }
    });
    return query;
}