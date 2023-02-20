// Jest unit testing user routes
import * as UserServices from '../userService';
import { describe, expect, test, beforeEach, afterEach, afterAll } from '@jest/globals';
import { UserIdContext, UserLoginContext, UserRegisterContext } from '../user';

beforeEach(() => {
    // Seed database
});

afterEach(() => {
    // Clear Database
});

afterAll(() => {
    UserServices.deleteAllUserService();
});

describe('Get all Users empty database', () => {
    test('Get all Users when no one is registered', async () => {
        const allUsers = await UserServices.getAllUserService();
        expect(allUsers.status).toBe(404);
    });
});

describe('Register User', () => {
    test('Register a new user', async () => {
        const smokeyBear: UserRegisterContext = {  
            firstName: 'Smokey',
            lastName: 'A Bear',
            email: 'smokeynoreply@nosmokey.com',
            password: 'Nofires',
        };
        const newUser = await UserServices.registerUserService(smokeyBear);
        expect(newUser.status).toBe(200);
        expect(newUser.data?.email).toBe(smokeyBear.email);
        expect(newUser.data?.firstName).toBe(smokeyBear.firstName);
        expect(newUser.data?.lastName).toBe(smokeyBear.lastName);
    });
});

describe('Register duplicate user', () => {
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