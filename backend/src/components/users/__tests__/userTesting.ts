// Jest unit testing user routes
import { PrismaClient } from '@prisma/client';
import { describe, expect, test, beforeAll, afterAll } from '@jest/globals';
import { seed } from '../../../seed';
import * as UserServices from '../userService';
import * as UserContexts from '../user';
import { getDatabaseId, getPublicId } from '../../../utils/hashId';

const prisma = new PrismaClient();

let userIds: number[];
beforeAll(async () => {
  await seed()
    .then(async (ids) => {
      userIds = [...ids];
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
});

afterAll(async () => {
  await prisma.user.deleteMany({});
});

describe('Get User income ID', () => {
  test('Get seeded user income', async () => {
    const user: UserContexts.UserContext = {
      id: getPublicId('user', userIds[0]),
    };
    const userData = await UserServices.getUserMonthlyIncomeService(user);
    expect(userData.status).toBe(200);
    expect(userData.aggregateData).toBe(900.87);
  });

  test('Get seeded user income', async () => {
    const user: UserContexts.UserContext = {
      id: getPublicId('user', userIds[1]),
    };
    const userData = await UserServices.getUserMonthlyIncomeService(user);
    expect(userData.status).toBe(200);
    expect(userData.aggregateData).toBe(0);
  });
});

describe('Get User income by id', () => {
  test('Get seeded user by ID', async () => {
    const user: UserContexts.UserContext = {
      id: getPublicId('user', userIds[0]),
    };
    const userData = await UserServices.getUserService(user);
    expect(userData.status).toBe(200);
    expect(userData.data?.email).toBe('smokey@bear.com');
    expect(userData.data?.firstName).toBe('Smokey');
    expect(userData.data?.lastName).toBe('BearDude');
  });
});

describe('Register User, test duplicate', () => {
  test('Register a new user, try registering duplicate', async () => {
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

  test('Try registering duplicate', async () => {
    const user: UserContexts.UserRegisterContext = {
      firstName: 'Smokey',
      lastName: 'A Bear',
      email: 'smokeynoreply@nosmokey.com',
      password: 'Nofires',
    };
    const duplicate = await UserServices.registerUserService(user);
    expect(duplicate.status).toBe(409);
    expect(duplicate.message).toBe('User already exists');
  });
});

describe('Register User, then delete user', () => {
  let userId = 0;
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
      userId = Number(getDatabaseId('user', newUser.data?.id));
    }
  });

  test('Delete newly registered user', async () => {
    const userIdContext: UserContexts.UserContext = {
      id: getPublicId('user', userId),
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
  let userId = 0;
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
      userId = Number(getDatabaseId('user', newUser.data.id));
    }
  });

  test('Get logged in user', async () => {
    const user: UserContexts.UserContext = {
      id: getPublicId('user', userId),
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
  let userId = 0;
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
      userId = Number(getDatabaseId('user', newUser.data.id));
    }
  });

  test('Update newly registered user', async () => {
    const userContext: UserContexts.UserContext = {
      id: getPublicId('user', userId),
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
      id: getPublicId('user', userId),
    };
    const updatedUser = await UserServices.getUserService(userContext);
    expect(updatedUser.status).toBe(200);
    expect(updatedUser.data?.firstName).toBe('Perry');
    expect(updatedUser.data?.lastName).toBe('Plat');
  });
});
