import { PrismaClient } from '@prisma/client'
import { UserRegisterContext, UserUpdateInput } from './user';
const prisma = new PrismaClient()

const getAllUsers = async () => {
    const query = await prisma.user.findMany();
    return query;
}

const deleteAllUsers = async () => {
    const query = await prisma.user.deleteMany({});
    return query;
}

const getUserById = async (userId: number) => {
    const query = await prisma.user.findUnique({
        where: {
            id: userId,
        }
    });
    return query;
}

const getUserByEmail = async (userEmail: string) => {
    const query = await prisma.user.findUnique({
        where: {
            email: userEmail,
        }
    });
    return query;
}

const createNewUser = async (userContext: UserRegisterContext) => {
    const query = await prisma.user.create({
        data: userContext,
    });
    return query;
}

const updateUser = async (userId: number, userContext: UserUpdateInput) => {
    const query = await prisma.user.update({
        where: { id: userId },
        data: userContext,
    });
    return query;
}

const deleteUser = async (userId: number) => {
    // Delete user with id, only pass email and name data back
    const query = await prisma.user.delete({
        where: {
            id: userId,
        },
        select: {
            email: true,
            firstName: true,
            lastName: true,
        }
    });
    return query;
}



export { getUserById, createNewUser, getUserByEmail, deleteUser, getAllUsers, updateUser, deleteAllUsers }