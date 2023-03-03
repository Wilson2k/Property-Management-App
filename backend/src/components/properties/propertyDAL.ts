import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const getAllProperties = async () => {
    const query = await prisma.property.findMany();
    return query;
};

const getPropertyById = async (propertyId: number) => {
    const query = await prisma.property.findUnique({
        where: {
            id: propertyId,
        }
    });
    return query;
};

const getPropertyByAddress = async (propertyAddress: string) => {
    const query = await prisma.property.findUnique({
        where: {
            address: propertyAddress,
        }
    });
    return query;
};

const getUserPropertiesByCity = async (ownerId: number, propertyCity: string) => {
    const query = await prisma.property.findMany({
        where: {
            ownerId: ownerId,
            city: propertyCity,
        }
    });
    return query;
};

const getUserPropertiesByState = async (ownerId: number, propertyState: string) => {
    const query = await prisma.property.findMany({
        where: {
            ownerId: ownerId,
            state: propertyState,
        }
    });
    return query;
};

const getUserPropertiesByType = async (ownerId: number, propertyType: string) => {
    const query = await prisma.property.findMany({
        where: {
            ownerId: ownerId,
            type: propertyType,
        }
    });
    return query;
};

const getUserPropertiesByTenant = async ( ownerId: number, tenantFname: string, tenantLname: string) => {
    const query = await prisma.property.findMany({
        where: {
            ownerId: ownerId,
            tenants: {
                some: {
                    firstName: tenantFname,
                    lastName: tenantLname,
                }
            },
        }
    });
    return query;
};

const getAllUserProperties = async ( ownerId: number ) => {
    const query = await prisma.property.findMany({
        where: {
            ownerId: ownerId,
        }
    });
    return query;
};

const getUserOpenTicketProperties = async ( ownerId: number) => {
    const query = await prisma.property.findMany({
        where: {
            ownerId: ownerId,
            tickets: {
                some: {
                    open: true,
                }
            },
        }
    });
    return query;
};


export { getAllProperties, getPropertyById, getPropertyByAddress, getAllUserProperties, getUserPropertiesByCity, getUserPropertiesByState, getUserPropertiesByType, getUserPropertiesByTenant, getUserOpenTicketProperties }