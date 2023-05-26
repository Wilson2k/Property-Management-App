import { Request, Response, NextFunction } from 'express';

// Check that request object has a valid session
export const checkSession = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.user != null) {
    if (req.path === '/api/register' || req.path === '/api/login') {
      res.redirect('/api/profile');
    } else {
      next();
    }
  } else {
    if (req.path === '/api/register' || req.path === '/api/login') {
      next();
    } else {
      res.status(401).send('Please login');
    }
  }
};
