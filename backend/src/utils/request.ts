import { Request } from 'express';

// Custom request object for typing request body
export default interface CustomRequest<T> extends Request {
  body: T;
}
