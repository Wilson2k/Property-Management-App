import { Request, Response } from 'express';
import * as UserServices from './userService';
import { UserContext, UserLoginContext, UserRegisterContext } from './user';

interface CustomRequest<T> extends Request {
  body: T;
}

// Getting all users
const getAllUsers = async (req: Request, res: Response) => {
  const allUserData = await UserServices.getAllUserService();
  if (allUserData.status === 200 && allUserData.data === undefined) {
    res.status(allUserData.status).send(allUserData.data);
  } else {
    res.status(allUserData.status).send(allUserData.message);
  }
};

// Get a single user
const getUser = async (req: CustomRequest<UserContext>, res: Response) => {
  // Create new user context from req object here
  const userContext: UserContext = {
    id: req.session.user?.toString(),
  };
  const userData = await UserServices.getUserService(userContext);
  if (userData.status === 200 && userData.data !== undefined) {
    res.status(userData.status).send(userData.data);
  } else {
    res.status(userData.status).send(userData.message);
  }
};

// Get user monthly income
const getUserIncome = async (req: CustomRequest<UserContext>, res: Response) => {
  // Create new user context from req object here
  const userContext: UserContext = {
    id: req.session.user?.toString(),
  };
  const userData = await UserServices.getUserMonthlyIncomeService(userContext);
  if (userData.status === 200 && userData.aggregateData !== undefined) {
    res.status(userData.status).send(userData.aggregateData);
  } else {
    res.status(userData.status).send(userData.message);
  }
};

// Update a user's info
const updateUser = async (req: CustomRequest<UserContext>, res: Response) => {
  // Create new user context from req object here
  const userContext: UserContext = {
    id: req.session.user?.toString(),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  };
  const userData = await UserServices.updateUserService(userContext);
  if (userData.status === 200 && userData.data !== undefined) {
    res.status(userData.status).send(userData.data);
  } else {
    res.status(userData.status).send(userData.message);
  }
};

// Login user
const loginUser = async (req: CustomRequest<UserLoginContext>, res: Response) => {
  // Create new user context from req object here
  const userContext: UserLoginContext = {
    email: req.body.email,
    password: req.body.password,
  };
  const userData = await UserServices.loginUserService(userContext);
  if (userData.status === 200 && userData.data !== undefined) {
    const sess = req.session;
    sess.user = userData.data.id;
    res.status(userData.status).send(userData.data);
  } else {
    res.status(userData.status).send(userData.message);
  }
};

// Register user
const registerUser = async (req: CustomRequest<UserRegisterContext>, res: Response) => {
  // Create new user context from req object here
  const userContext: UserRegisterContext = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  };
  const newUser = await UserServices.registerUserService(userContext);
  if (newUser.status === 200 && newUser.data !== undefined) {
    res.status(newUser.status).send(newUser.data);
  } else {
    res.status(newUser.status).send(newUser.message);
  }
};

// Delete user
const deleteUser = async (req: CustomRequest<UserContext>, res: Response) => {
  // Create new user context from req object here
  const userContext: UserContext = {
    id: req.session.user?.toString(),
  };
  const deletedUser = await UserServices.deleteUserService(userContext);
  if (deletedUser.status === 200 && deletedUser.data !== undefined) {
    res.status(deletedUser.status).send(deletedUser.data);
  } else {
    res.status(deletedUser.status).send(deletedUser.message);
  }
};

// Logout user
const logoutUser = (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(400).send('Logout failed');
    }
    res.status(200).end('Logged Out');
  });
};

export {
  loginUser,
  registerUser,
  getUser,
  logoutUser,
  deleteUser,
  getAllUsers,
  updateUser,
  getUserIncome,
};
