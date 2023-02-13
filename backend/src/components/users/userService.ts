import { getUserData, createNewUser } from "./userDAL";
import { UserLoginContext, UserRegisterContext } from './user';
import { genSalt, hash, compare } from "bcrypt";

const loginUserService = async (userContext: UserLoginContext) => {
    const currentUser = await getUserData(userContext);
    if (currentUser !== null){
        compare(userContext.password, currentUser.password).then((res) => {
            if(res){
                return currentUser;
            }
        });
    }
    return currentUser;
}

const registerUserService = async (userContext: UserRegisterContext) => {
    const findUser = await getUserData(userContext);
    if (findUser === null){
        const newUser = await createNewUser(userContext);
        return newUser;
    }
    else {
        return null;
    }
}

export { loginUserService, registerUserService }