import * as UserDAL from './userDAL';
import * as UserContexts from './user';
import { hash, compare } from 'bcrypt';

const loginUserService = async (userContext: UserContexts.UserLoginContext) => {
    const userReturn: UserContexts.UserReturnContext = {
        message: 'Error getting user',
        status: 404,
    }
    if(typeof(userContext.email) !== 'undefined'){
        const findUser = await UserDAL.getUserByEmail(userContext.email);
        if (findUser != null){
            await compare(userContext.password, findUser.password).then((res) => {
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
    }
    return userReturn;
}

const registerUserService = async (userContext: UserContexts.UserRegisterContext) => {
    const userReturn: UserContexts.UserReturnContext = {
        message: 'Error registering user',
        status: 400,
    }
    if (typeof(userContext.email) !== 'undefined') {
        const findUser = await UserDAL.getUserByEmail(userContext.email);
        if (findUser == null){
            await hash(userContext.password, 12).then(async (hash) => {
                userContext.password = hash;
                const newUser = await UserDAL.createNewUser(userContext);
                userReturn.data = newUser;
                userReturn.status = 200;
                userReturn.message = 'Register Success';
            });
        } else {
            userReturn.message = 'User already exists';
            userReturn.status = 409;
        }
    }
    return userReturn;
}

const getUserService = async (userContext: UserContexts.UserContext) => {
    const userReturn: UserContexts.UserReturnContext = {
        message: 'Error getting user',
        status: 404,
    }
    if(typeof(userContext.id) !== 'undefined'){
        // Check that input string is numeric
        const userId = +userContext.id;
        if(isNaN(userId)) {
            userReturn.message = 'Bad user id';
            userReturn.status = 422;
            return userReturn;
        }
        const findUser = await UserDAL.getUserById(userId);
        if(findUser != null){
            userReturn.message = 'User found';
            userReturn.data = findUser;
            userReturn.status = 200;
        }
    }
    return userReturn;
}

const updateUserService = async (userContext: UserContexts.UserContext) => {
    const userReturn: UserContexts.UserReturnContext = {
        message: 'Error getting user',
        status: 404,
    }
    if(typeof(userContext.id) !== 'undefined'){
        // Check that input string is numeric
        const userId = +userContext.id;
        if(isNaN(userId)) {
            userReturn.message = 'Bad user id';
            userReturn.status = 422;
            return userReturn;
        }
        // Check that updated data is there
        if(typeof(userContext.email) !== 'undefined' || typeof(userContext.firstName) !== 'undefined' || typeof(userContext.lastName) !== 'undefined' || typeof(userContext.password) !== 'undefined'){
            const {id, ...updateData} = userContext || {};
            const updatedUser = await UserDAL.updateUser(userId, updateData);
            if(updatedUser != null){
                userReturn.message = 'User updated';
                userReturn.data = updatedUser;
                userReturn.status = 200;
            }
        } else {
            userReturn.message = 'No data updated';
            userReturn.status = 400;
        }
    }
    return userReturn;
}

const getAllUserService = async () => {
    const userReturn: UserContexts.MultUsersReturnContext = {
        message: 'Error getting users',
        status: 400,
    }
    const users = await UserDAL.getAllUsers();
    if(users.length !== 0){
        userReturn.message = 'Retrieved users';
        userReturn.data = users;
        userReturn.status = 200;
    } else {
        userReturn.message = 'No users found';
        userReturn.status = 404;
    }
    return userReturn;
}

const deleteUserService = async (userContext: UserContexts.UserContext) => {
    const userReturn: UserContexts.UserReturnContext = {
        message: 'Error deleting user',
        status: 400,
    }
    if(typeof(userContext.id) !== 'undefined'){
        // Check that input string is numeric
        const userId = +userContext.id;
        if(isNaN(userId)) {
            userReturn.message = 'Bad Input';
            userReturn.status = 422;
            return userReturn;
        }
        const findUser = await UserDAL.deleteUser(userId);
        if(findUser != null){
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
    }
    return userReturn;
}

// Returns number of deleted users
const deleteAllUserService = async () => {
    const deletedCount = await UserDAL.deleteAllUsers();
    return deletedCount.count;
}

export { loginUserService, registerUserService, getUserService, deleteUserService, updateUserService, getAllUserService, deleteAllUserService }