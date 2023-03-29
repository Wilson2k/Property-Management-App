import * as UserDAL from './userDAL';
import * as UserContexts from './user';
import { hash, compare } from 'bcrypt';
import { getDatabaseId, getPublicId } from '../../utils/hashId';

const loginUserService = async (userContext: UserContexts.UserLoginContext) => {
  const userReturn: UserContexts.UserReturnContext = {
    message: 'Error logging user in',
    status: 404,
  };
  if (userContext.email != null) {
    const findUser = await UserDAL.getUserByEmail(userContext.email);
    if (findUser != null) {
      const publicId = getPublicId('user', findUser.id);
      const userData: UserContexts.UserData = { ...findUser, id: publicId };
      await compare(userContext.password, findUser.password).then((res) => {
        if (res) {
          userReturn.data = userData;
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
};

const registerUserService = async (userContext: UserContexts.UserRegisterContext) => {
  const userReturn: UserContexts.UserReturnContext = {
    message: 'Error registering user',
    status: 400,
  };
  if (userContext.email != null) {
    const findUser = await UserDAL.getUserByEmail(userContext.email);
    if (findUser === null) {
      await hash(userContext.password, 12).then(async (hash) => {
        userContext.password = hash;
        const newUser = await UserDAL.createNewUser(userContext);
        const publicId = getPublicId('user', newUser.id);
        const userData: UserContexts.UserData = { ...newUser, id: publicId };
        userReturn.data = userData;
        userReturn.status = 200;
        userReturn.message = 'Register Success';
      });
    } else {
      userReturn.message = 'User already exists';
      userReturn.status = 409;
    }
  }
  return userReturn;
};

const getUserService = async (userContext: UserContexts.UserContext) => {
  const userReturn: UserContexts.UserReturnContext = {
    message: 'Error getting user',
    status: 404,
  };
  if (userContext.id != null) {
    // Check that input string is numeric
    const databaseId = getDatabaseId('user', userContext.id);
    const userId = Number(databaseId);
    if (isNaN(userId)) {
      userReturn.message = 'Bad user id';
      userReturn.status = 422;
      return userReturn;
    }
    const findUser = await UserDAL.getUserById(userId);
    if (findUser != null) {
      const publicId = getPublicId('user', findUser.id);
      const userData: UserContexts.UserData = { ...findUser, id: publicId };
      userReturn.message = 'User found';
      userReturn.data = userData;
      userReturn.status = 200;
    }
  }
  return userReturn;
};

const getUserMonthlyIncomeService = async (userContext: UserContexts.UserContext) => {
  const userReturn: UserContexts.UserReturnContext = {
    message: 'Error getting user',
    status: 404,
  };
  if (userContext.id != null) {
    // Check that input string is numeric
    const databaseId = getDatabaseId('user', userContext.id);
    const userId = Number(databaseId);
    if (isNaN(userId)) {
      userReturn.message = 'Bad user id';
      userReturn.status = 422;
      return userReturn;
    }
    const userIncome = await UserDAL.getUserMonthlyIncome(userId);
    if (userIncome != null) {
      userReturn.message = 'User income found';
      userReturn.aggregateData = Number(userIncome);
      userReturn.status = 200;
    } else {
      userReturn.message = 'User has no income';
      userReturn.aggregateData = 0;
      userReturn.status = 200;
    }
  }
  return userReturn;
};

const updateUserService = async (userContext: UserContexts.UserContext) => {
  const userReturn: UserContexts.UserReturnContext = {
    message: 'Error updating user',
    status: 404,
  };
  if (userContext.id != null) {
    // Check that input string is numeric
    const { id, ...updateData } = userContext;
    const databaseId = getDatabaseId('user', id);
    const userId = Number(databaseId);
    if (isNaN(userId) || userId < 0) {
      userReturn.message = 'Bad user id';
      userReturn.status = 422;
      return userReturn;
    }
    if (updateData.email != null) {
      const userRecord = await UserDAL.getUserById(userId);
      if (userRecord != null) {
        userReturn.message = 'Email already taken';
        userReturn.status = 409;
        return userReturn;
      }
    }
    // Check that updated data is there
    if (
      updateData.email != null ||
      updateData.firstName != null ||
      updateData.lastName != null ||
      updateData.password != null
    ) {
      if (updateData.password != null) {
        const hashedPass = await hash(updateData.password, 12);
        updateData.password = hashedPass;
      }
      const updatedUser = await UserDAL.updateUser(userId, updateData);
      if (updatedUser != null) {
        const publicId = getPublicId('user', updatedUser.id);
        const userData: UserContexts.UserData = { ...updatedUser, id: publicId };
        userReturn.message = 'User updated';
        userReturn.data = userData;
        userReturn.status = 200;
      }
    } else {
      userReturn.message = 'No data updated';
      userReturn.status = 400;
    }
  }
  return userReturn;
};

const getAllUserService = async () => {
  const userReturn: UserContexts.MultUsersReturnContext = {
    message: 'Error getting users',
    status: 400,
  };
  const users = await UserDAL.getAllUsers();
  if (users.length !== 0) {
    const usersData = users.map((user) => {
      const publicId = getPublicId('user', user.id);
      const userData: UserContexts.UserData = { ...user, id: publicId };
      return userData;
    });
    userReturn.message = 'Retrieved users';
    userReturn.data = usersData;
    userReturn.status = 200;
  } else {
    userReturn.message = 'No users found';
    userReturn.status = 404;
  }
  return userReturn;
};

const deleteUserService = async (userContext: UserContexts.UserContext) => {
  const userReturn: UserContexts.UserReturnContext = {
    message: 'Error deleting user',
    status: 400,
  };
  if (userContext.id != null) {
    // Check that input string is numeric
    const databaseId = getDatabaseId('user', userContext.id);
    const userId = Number(databaseId);
    if (isNaN(userId) || userId < 0) {
      userReturn.message = 'Bad user id';
      userReturn.status = 422;
      return userReturn;
    }
    const findUser = await UserDAL.getUserById(userId);
    if (findUser == null) {
      userReturn.message = 'User not found';
      userReturn.status = 404;
      return userReturn;
    }
    const deleteUser = await UserDAL.deleteUser(userId);
    if (deleteUser != null) {
      const publicId = getPublicId('user', deleteUser.id);
      const userData: UserContexts.UserData = { ...deleteUser, id: publicId };
      userReturn.message = 'User deleted';
      userReturn.data = userData;
      userReturn.status = 200;
    }
  }
  return userReturn;
};

export {
  loginUserService,
  registerUserService,
  getUserService,
  deleteUserService,
  updateUserService,
  getAllUserService,
  getUserMonthlyIncomeService,
};
