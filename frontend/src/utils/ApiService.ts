import axios from "axios";
import { AxiosError } from 'axios';
import * as UserTypes from '../types/User';
import * as PropertyTypes from '../types/Property'

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

const loginUser = async (user: UserTypes.UserLoginContext) => {
  return await apiClient.post('/login', user).catch((error: AxiosError) => {
    return error.response;
  });
}

const logoutUser = async () => {
  return await apiClient.post('/logout').catch((error: AxiosError) => {
    return error.response;
  });
}

const getUser = async () => {
  return await apiClient.get('/profile').catch((error: AxiosError) => {
    return error.response;
  });
}

const getProperties = async () => {
  return await apiClient.get('/properties').catch((error: AxiosError) => {
    return error.response;
  });
}

const getProperty = async (propertyId: number) => {
  return await apiClient.get(`/property/${propertyId}`).catch((error: AxiosError) => {
    return error.response;
  });
}

const createProperty = async (newProperty: PropertyTypes.PropertyCreateContext) => {
  return await apiClient.post('/property/create', newProperty).catch((error: AxiosError) => {
    return error.response;
  });
}

export {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  getProperties,
  createProperty,
  getProperty
}