// Require certain fields for user login and register
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

interface UserContext {
    id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
}

interface UserUpdateInput {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
}

export type {
    UserLoginContext,
    UserRegisterContext,
    UserContext,
    UserUpdateInput
}