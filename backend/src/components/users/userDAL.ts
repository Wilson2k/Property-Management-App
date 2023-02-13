import { PrismaClient } from '@prisma/client'
import { UserLoginContext, UserRegisterContext } from './user';
const prisma = new PrismaClient()

const getUserData = async (userContext: UserLoginContext) => {
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

export { getUserData, createNewUser }