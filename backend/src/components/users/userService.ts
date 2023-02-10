import { getUserData } from "./userDAL";
import { UserContext } from './user';
import { genSalt, hash, compare } from "bcrypt";

const loginUserService = async (userContext: UserContext) => {
    const currentUser = await getUserData(userContext);
    if (currentUser !== null){
        compare(userContext.password, currentUser.password).then((res) => {
            if(res){
                return currentUser
            }
        });
    }
    return currentUser
}

export { loginUserService }