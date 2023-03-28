import { PrismaClient } from '@prisma/client';
import { LeaseCreateContext, LeaseUpdateInput } from './lease';
const prisma = new PrismaClient();

const createNewLease = async (leaseContext: LeaseCreateContext) => {
    const query = await prisma.lease.create({
        data: leaseContext,
    });
    return query;
};


const updateLease = async (leaseId: number, leaseContext: LeaseUpdateInput) => {
    const query = await prisma.lease.update({
        where: { id: leaseId },
        data: leaseContext,
    });
    return query;
};


const deleteLease = async (leaseId: number) => {
    const query = await prisma.lease.delete({
        where: { id: leaseId },
    });
    return query;
};

const getLeaseById = async (leaseId: number) => {
    const query = await prisma.lease.findUnique({
        where: {
            id: leaseId,
        },
    });
    return query;
};

const getLeasesByTenant = async (tenantId: number) => {

};