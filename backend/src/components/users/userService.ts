import { getUserById, getUserByEmail, createNewUser, deleteUser } from "./userDAL";
import { UserLoginContext, UserRegisterContext, UserIdContext, UserReturnContext } from './user';
import { hash, compare } from "bcrypt";

const loginUserService = async (userContext: UserLoginContext) => {
    const userReturn: UserReturnContext = {
        message: 'Error getting user',
        status: 404,
    }
    const findUser = await getUserByEmail(userContext);
    if (findUser !== null){
        compare(userContext.password, findUser.password).then((res) => {
            if(res){
                userReturn.data = findUser;
                userReturn.message = 'Login Success';
                userReturn.status = 200;
            } else {
                userReturn.message = 'Incorrect Password';
                userReturn.status = 400;
            }
        });
    }
    return userReturn;
}

const registerUserService = async (userContext: UserRegisterContext) => {
    const userReturn: UserReturnContext = {
        message: 'Error registering user',
        status: 400,
    }
    const findUser = await getUserByEmail(userContext);
    if (findUser === null){
        hash(userContext.password, 12).then(async (hash) => {
            userContext.password = hash;
            const newUser = await createNewUser(userContext);
            userReturn.data = newUser;
            userReturn.status = 200;
            userReturn.message = 'Register Success';
        });
    } else {
        userReturn.message = 'User already exists';
        userReturn.status = 409;
    }
    return userReturn;
}

const getUserService = async (userContext: UserIdContext) => {
    const userReturn: UserReturnContext = {
        message: 'Error getting user',
        status: 404,
    }
    // Check that input string is numeric
    const userId = +userContext.id;
    if(isNaN(userId)) {
        userReturn.message = 'Bad user id';
        userReturn.status = 422;
        return userReturn;
    }
    const findUser = await getUserById(userContext);
    if(findUser !== null){
        userReturn.message = 'User found';
        userReturn.data = findUser;
        userReturn.status = 200;
    }
    return userReturn;
}

const deleteUserService = async (userContext: UserIdContext) => {
    const userReturn: UserReturnContext = {
        message: 'Error deleting user',
        status: 400,
    }
    // Check that input string is numeric
    const userId = +userContext.id;
    if(isNaN(userId)) {
        userReturn.message = 'Bad Input';
        userReturn.status = 422;
        return userReturn;
    }
    const findUser = await deleteUser(userContext);
    if(findUser !== null){
        userReturn.message = 'User found';
        userReturn.data = {
            firstName: findUser.firstName,
            lastName: findUser.lastName,
            email: findUser.email,
            password: '',
            id: 0,
        };
        userReturn.status = 200;
    }
    return userReturn;
}

export { loginUserService, registerUserService, getUserService, deleteUserService }