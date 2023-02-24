import { Request, Response } from 'express';
import * as UserServices from './userService';
import { UserIdContext, UserLoginContext, UserRegisterContext } from './user';

// Getting all users
const getAllUsers = async (req: Request, res: Response) => {
    const allUserData = await UserServices.getAllUserService();
    if(allUserData.status === 200 && allUserData.data === undefined){
        res.status(allUserData.status).send(allUserData.data);
    } else {
        res.status(allUserData.status).send(allUserData.message);
    }
};

// Get a single user
const getUser = async (req: Request, res: Response) => {
    // Create new user context from req object here
    const userContext: UserIdContext = {
        id: req.body.id,
    };
    const userData = await UserServices.getUserService(userContext);
    if(userData.status === 200 && userData.data !== undefined){
        res.status(userData.status).send(userData.data);
    } else {
        res.status(userData.status).send(userData.message);
    }
};

// Login user
const loginUser = async (req: Request, res: Response) => {
    // Create new user context from req object here
    const userContext: UserLoginContext = {
        email: req.body.email,
        password: req.body.password,
    };
    const userData = await UserServices.loginUserService(userContext);
    if(userData.status === 200 && userData.data !== undefined){
        req.session.id = userData.data.id.toString();
        res.status(userData.status).send(userData.data);
    } else {
        res.status(userData.status).send(userData.message);
    }
};

// Register user
const registerUser = async (req: Request, res: Response) => {
    // Create new user context from req object here
    const userContext: UserRegisterContext = {  
        firstName: req.body.fname,
        lastName: req.body.lname,
        email: req.body.email,
        password: req.body.password,
    };
    const newUser = await UserServices.registerUserService(userContext);
    if(newUser.status === 200 && newUser.data !== undefined){
        res.status(newUser.status).send(newUser.data);
    } else {
        res.status(newUser.status).send(newUser.message);
    }
};

// Delete user
const deleteUser = async (req: Request, res: Response) => {
    // Create new user context from req object here
    const userContext: UserIdContext = {
        id: req.body.id,
    };
    const deletedUser = await UserServices.deleteUserService(userContext);
    if(deletedUser.status === 200 && deletedUser.data !== undefined){
        res.status(deletedUser.status).send(deletedUser.data);
    } else {
        res.status(deletedUser.status).send(deletedUser.message);
    }
};

// Logout user
const logoutUser = async (req: Request, res: Response) => {
    req.session.destroy((err) => {
        res.status(200);
        res.redirect('/');
    });
};

export { loginUser, registerUser, getUser, logoutUser, deleteUser, getAllUsers }