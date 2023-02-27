import { PrismaClient } from '@prisma/client'
import { PropertyIdContext, PropertyOwnerIdContext, PropertyLocationContext } from './property';
const prisma = new PrismaClient()

const getAllProperties = async () => {
    const query = await prisma.property.findMany();
    return query;
};

const getPropertyById = async (propertyContext: PropertyIdContext) => {
    const propertyId = +propertyContext.id;
    const query = await prisma.property.findUnique({
        where: {
            id: propertyId,
        }
    });
    return query;
};

const getPropertyByAddress = async (propertyContext: PropertyLocationContext) => {
    const query = await prisma.property.findUnique({
        where: {
            address: propertyContext.location,
        }
    });
    return query;
};

const getUserPropertiesByCity = async (ownerContext: PropertyOwnerIdContext, propertyContext: PropertyLocationContext) => {
    const userId = +ownerContext.ownerId;
    const query = await prisma.property.findMany({
        where: {
            ownerId: userId,
            city: propertyContext.location,
        }
    });
    return query;
};

const getUserPropertiesByState = async (propertyContext: PropertyLocationContext) => {
    const query = await prisma.property.findMany({
        where: {
            state: propertyContext.location,
        }
    });
    return query;
};

const getUserPropertiesByType = async (propertyContext: PropertyLocationContext) => {

};

const getAllUserProperties = async ( ownerContext: PropertyOwnerIdContext) => {
    const userId = +ownerContext.ownerId;
    const query = await prisma.property.findMany({
        where: {
            ownerId: userId,
        }
    });
    return query;
};

const getUserOpenTicketProperties = async ( ownerContext: PropertyOwnerIdContext) => {
    const userId = +ownerContext.ownerId;
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
};

export { getPropertyById, getPropertyByAddress, getAllUserProperties, getUserPropertiesByCity, getUserOpenTicketProperties, getAllProperties }