import { User } from "@prisma/client";

interface UserLoginContext {
    email: string;
    password: string;
}

interface UserRegisterContext {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

interface UserIdContext {
    id: string;
}

interface UserReturnContext {
    status: number;
    data?: User;
    message: string;
}

export { UserLoginContext, UserRegisterContext, UserIdContext, UserReturnContext }