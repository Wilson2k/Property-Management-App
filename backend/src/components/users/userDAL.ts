import { PrismaClient } from '@prisma/client'
import { UserContext } from './user';
const prisma = new PrismaClient()

const getUserData = async (userContext: UserContext) => {
    const query = await prisma.user.findUnique({
        where: {
            email: userContext.email,
        }
    })
    return query
}

export { getUserData }