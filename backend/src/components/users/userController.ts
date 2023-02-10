import { Request, Response } from 'express';
import { loginUserService } from './userService';
import { UserContext } from './user';

// Getting all users
const getUsers = async (req: Request, res: Response) => {

};

// Get a single user
const getUser = async (req: Request, res: Response) => {

};

// Register user
const registerUser = async (req: Request, res: Response) => {

};

// Delete user
const deleteUser = async (req: Request, res: Response) => {

};

// Login user
const loginUser = async (req: Request, res: Response) => {
    // Create new user context from req object here
    const userContext: UserContext = {
        email: req.body.email,
        password: req.body.password
    }
    const user = await loginUserService(userContext);
    if(user !== null){
        req.session.id = user.email
        res.send('Logged in')
    } else {
        res.send('Not logged in')
    }
};

// Logout user
const logoutUser = async (req: Request, res: Response) => {

};

export { loginUser }