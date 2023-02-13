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

export { UserLoginContext, UserRegisterContext }