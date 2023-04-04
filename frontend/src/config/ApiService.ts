import axios from "axios";
import { AxiosError } from 'axios';
import * as UserTypes from '../types/User';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-type": "application/json",
  },
  withCredentials: true
});

const registerUser = async (newUser: UserTypes.UserRegisterContext) => {
  return await apiClient.post('/register', newUser).catch((error: AxiosError) => {
    return error.response;
  });
}

const loginUser = async (newUser: UserTypes.UserLoginContext) => {
  return await apiClient.post('/login', newUser).catch((error: AxiosError) => {
    return error.response;
  });
}

const getUser = async () => {
  return await apiClient.get('/profile').catch((error: AxiosError) => {
    return error.response;
  });
}

export {
  registerUser,
  loginUser,
  getUser
}