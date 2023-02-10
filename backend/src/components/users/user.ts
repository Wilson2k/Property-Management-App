interface UserLoginContext {
    email: string;
    password: string;
}

interface UserRegisterContext {
    fname: string;
    lname: string;
    email: string;
    password: string;
}

export { UserLoginContext, UserRegisterContext }