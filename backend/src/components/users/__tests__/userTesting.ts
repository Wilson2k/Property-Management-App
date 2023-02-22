// Jest unit testing user routes
import * as UserServices from '../userService';
import { describe, expect, test, afterAll, beforeAll } from '@jest/globals';
import { UserIdContext, UserLoginContext, UserRegisterContext } from '../user';

beforeAll(async () => {
    // Seed database with users
    const user1: UserRegisterContext = {  
        firstName: 'Wilson',
        lastName: 'Human',
        email: 'wilson@nosmokey.com',
        password: 'NoBears',
    };
    const user2: UserRegisterContext = {  
        firstName: 'Man',
        lastName: 'Bear',
        email: 'manbear@nosmokey.com',
        password: 'pigbear',
    };
    let users = [];
    users.push(user1, user2);
    for(let user of users){
        await UserServices.registerUserService(user);
    }
});

describe('Register User, test duplicate', () => {
    test('Register a new user', async () => {
        const user: UserRegisterContext = {  
            firstName: 'Smokey',
            lastName: 'A Bear',
            email: 'smokeynoreply@nosmokey.com',
            password: 'Nofires',
        };
        const newUser = await UserServices.registerUserService(user);
        expect(newUser.status).toBe(200);
        expect(newUser.data?.email).toBe(user.email);
        expect(newUser.data?.firstName).toBe(user.firstName);
        expect(newUser.data?.lastName).toBe(user.lastName);
    });

    test('Register existing user', async () => {
        const userEmail = 'smokeynoreply@nosmokey.com'
        const userPass = 'arsonist'
        const testBear: UserRegisterContext = {  
            firstName: 'Testy',
            lastName: 'A Bear',
            email: userEmail,
            password: userPass,
        };
        const newUser = await UserServices.registerUserService(testBear);
        expect(newUser.status).toBe(409);
    });
});

describe('Register User, then delete user', () => {
    let userId = 0
    const user: UserRegisterContext = {  
        firstName: 'Rubber',
        lastName: 'Ducky',
        email: 'rubber@ducky.com',
        password: 'quackquack',
    };
    test('Register a new user', async () => {
        const newUser = await UserServices.registerUserService(user);
        expect(newUser.status).toBe(200);
        expect(newUser.data?.email).toBe(user.email);
        expect(newUser.data?.firstName).toBe(user.firstName);
        expect(newUser.data?.lastName).toBe(user.lastName);
        if(newUser.data?.id){
            userId = newUser.data?.id;
        }
    });

    test('Delete newly registered user', async () => {
        const userIdContext: UserIdContext = {  
            id: userId.toString(),
        };
        const deletedUser = await UserServices.deleteUserService(userIdContext);
        expect(deletedUser.status).toBe(200);
        expect(deletedUser.data?.email).toBe(user.email);
        expect(deletedUser.data?.firstName).toBe(user.firstName);
        expect(deletedUser.data?.lastName).toBe(user.lastName);
        const getDeleted = await UserServices.getUserService(userIdContext);
        expect(getDeleted.status).toBe(404);
    });
});

describe('Login User, get logged in user', () => {
    let userId = 0
    test('Login a registered user', async () => {
        const user: UserLoginContext = {  
            email: 'wilson@nosmokey.com',
            password: 'NoBears',
        };
        const newUser = await UserServices.loginUserService(user);
        expect(newUser.status).toBe(200);
        expect(newUser.data?.email).toBe(user.email);
        expect(newUser.data?.firstName).toBe('Wilson');
        expect(newUser.data?.lastName).toBe('Human');
        expect(newUser.data?.id).toBeDefined();
        if(newUser.data?.id){
            userId = newUser.data?.id;
        }
    });

    test('Get logged in user', async () => {
        const user: UserIdContext = {  
            id: userId.toString(),
        };
        const newUser = await UserServices.getUserService(user);
        expect(newUser.status).toBe(200);
        expect(newUser.data?.email).toBe('wilson@nosmokey.com');
        expect(newUser.data?.firstName).toBe('Wilson');
        expect(newUser.data?.lastName).toBe('Human');
        expect(newUser.data?.id).toBeDefined();
    });
});

describe('Delete all users', () => {
    test('Delete all registered users', async () => {
        await UserServices.deleteAllUserService();
        const allUsers = await UserServices.getAllUserService();
        expect(allUsers.status).toBe(404);
        expect(allUsers.message).toBe('No Users found');
    });
});