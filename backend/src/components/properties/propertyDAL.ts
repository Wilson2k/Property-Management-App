import { PrismaClient } from '@prisma/client'
import { PropertyIdContext, PropertyAddressContext, PropertyOwnerIdContext } from './property';
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

const getAllProperties = async () => {
    const query = await prisma.property.findMany();
    return query;
}

const getAllUserProperties = async (PropertyOwnerIdContext: PropertyOwnerIdContext) => {
    const userId = +PropertyOwnerIdContext.ownerId;
    const query = await prisma.property.findMany({
        where: {
            ownerId: userId,
        }
    });
    return query;
}

const getUserOpenTicketProperties = async (PropertyOwnerIdContext: PropertyOwnerIdContext) => {
    const userId = +PropertyOwnerIdContext.ownerId;
    const query = await prisma.property.findMany({
        where: {
            ownerId: userId,
            tickets: {
                some: {
                    open: true,
                }
            },
        }
    });
    return query;
}

export { getPropertyById, getPropertyByAddress, getAllUserProperties, getUserOpenTicketProperties, getAllProperties }