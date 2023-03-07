// Jest unit testing user routes
import { PrismaClient } from '@prisma/client'
import * as UserServices from '../userService';
import { describe, expect, test, beforeAll } from '@jest/globals';
import * as UserContexts from '../user';
import { seed } from '../../../seed';

const prisma = new PrismaClient()

beforeAll(async () => {
    seed().then(async () => {
        await prisma.$disconnect()
    }).catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    });
});

describe('Register User, test duplicate', () => {
    test('Register a new user', async () => {
        const user: UserContexts.UserRegisterContext = {
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
        const testBear: UserContexts.UserRegisterContext = {
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
    const user: UserContexts.UserRegisterContext = {
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
        if (newUser.data?.id) {
            userId = newUser.data?.id;
        }
    });

    test('Delete newly registered user', async () => {
        const userIdContext: UserContexts.UserContext = {
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
        const user: UserContexts.UserLoginContext = {
            email: 'wilson@nosmokey.com',
            password: 'NoBears',
        };
        const newUser = await UserServices.loginUserService(user);
        expect(newUser.status).toBe(200);
        expect(newUser.data?.email).toBe(user.email);
        expect(newUser.data?.firstName).toBe('Wilson');
        expect(newUser.data?.lastName).toBe('Human');
        expect(newUser.data?.id).toBeDefined();
        if (newUser.data?.id) {
            userId = newUser.data?.id;
        }
    });

    test('Get logged in user', async () => {
        const user: UserContexts.UserContext = {
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

describe('Register then update a new user', () => {
    let userId = 0
    const user: UserContexts.UserRegisterContext = {
        firstName: 'Big',
        lastName: 'Duckbear',
        email: 'duckbear@ducky.com',
        password: 'honkhonk',
    };
    test('Register a new user', async () => {
        const newUser = await UserServices.registerUserService(user);
        expect(newUser.status).toBe(200);
        expect(newUser.data?.email).toBe(user.email);
        expect(newUser.data?.firstName).toBe(user.firstName);
        expect(newUser.data?.lastName).toBe(user.lastName);
        if (newUser.data?.id) {
            userId = newUser.data?.id;
        }
    });

    test('Update newly registered user', async () => {
        const userContext: UserContexts.UserContext = {
            id: userId.toString(),
            firstName: 'Perry',
            lastName: 'Plat',
        };
        const updatedUser = await UserServices.updateUserService(userContext);
        expect(updatedUser.status).toBe(200);
        expect(updatedUser.data?.firstName).toBe('Perry');
        expect(updatedUser.data?.lastName).toBe('Plat');
    });

    test('Get updated user data', async () => {
        const userContext: UserContexts.UserContext = {
            id: userId.toString(),
        };
        const updatedUser = await UserServices.getUserService(userContext);
        expect(updatedUser.status).toBe(200);
        expect(updatedUser.data?.firstName).toBe('Perry');
        expect(updatedUser.data?.lastName).toBe('Plat');
    });
});

describe('Delete all users', () => {
    test('Delete all registered users', async () => {
        await UserServices.deleteAllUserService();
        const allUsers = await UserServices.getAllUserService();
        expect(allUsers.status).toBe(404);
        expect(allUsers.message).toBe('No users found');
    });
});