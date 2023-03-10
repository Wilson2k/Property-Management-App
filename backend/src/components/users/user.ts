import { User } from '@prisma/client';

// Require certain fields for user login and register
interface UserLoginContext {
  email: string;
  password: string;
}

interface UserRegisterContext {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface UserContext {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
}

interface UserUpdateInput {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
}

// Contexts for user services
interface UserReturnContext {
  status: number;
  data?: User;
  aggregateData?: number;
  message: string;
}

interface MultUsersReturnContext {
  status: number;
  data?: User[];
  message: string;
}

export {
  UserLoginContext,
  UserRegisterContext,
  UserContext,
  UserUpdateInput,
  UserReturnContext,
  MultUsersReturnContext,
};
