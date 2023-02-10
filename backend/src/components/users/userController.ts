import { Request, Response } from 'express';
import { loginUserService } from './userService';
import { UserLoginContext, UserRegisterContext } from './user';

// Getting all users
const getUsers = async (req: Request, res: Response) => {

};

// Get a single user
const getUser = async (req: Request, res: Response) => {

};

// Register user
const registerUser = async (req: Request, res: Response) => {
    // Create new user context from req object here
    const userContext: UserRegisterContext = {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: req.body.password
    }
};

// Delete user
const deleteUser = async (req: Request, res: Response) => {

};

// Login user
const loginUser = async (req: Request, res: Response) => {
    // Create new user context from req object here
    const userContext: UserLoginContext = {
        email: req.body.email,
        password: req.body.password
    }
    const user = await loginUserService(userContext);
    if(user !== null){
        req.session.id = user.email
        res.status(200).send(user)
    } else {
        res.status(404).send('User not found')
    }
};

// Logout user
const logoutUser = async (req: Request, res: Response) => {

};

export { loginUser }