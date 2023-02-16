// Jest unit testing user routes
import * as UserServices from '../userService';
import { describe, expect, test } from '@jest/globals';
import { UserIdContext, UserLoginContext, UserRegisterContext } from '../user';

describe('Register User', () => {
    test('Register a new user', async () => {
        const smokeyBear: UserRegisterContext = {  
            firstName: "Smokey",
            lastName: "A Bear",
            email: "smokeynoreply@smokey.com",
            password: "Nofires",
        };
        const newUser = await UserServices.registerUserService(smokeyBear);
        expect(newUser.status).toBe(200);
    });
});