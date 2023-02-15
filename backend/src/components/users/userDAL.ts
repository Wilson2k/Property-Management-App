import { PrismaClient } from '@prisma/client'
import { UserLoginContext, UserRegisterContext, UserIdContext } from './user';
const prisma = new PrismaClient()

const getUserById = async (userContext: UserIdContext) => {
    const userId = +userContext.id;
    const query = await prisma.user.findUnique({
        where: {
            id: userId,
        }
    });
    return query;
}

const getUserByEmail = async (userContext: UserLoginContext | UserRegisterContext) => {
    const query = await prisma.user.findUnique({
        where: {
            email: userContext.email,
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

const deleteUser = async (userContext: UserIdContext) => {
    const userId = +userContext.id;
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



export { getUserById, createNewUser, getUserByEmail, deleteUser }