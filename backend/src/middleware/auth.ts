import { Request, Response, NextFunction } from 'express';

// Check that request object has a valid session
export const checkSession = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.user != null) {
    if (req.path === '/register' || req.path === '/login'){
      res.redirect('/profile');
    } else {
      next();
    }
  } else {
    if (req.path === '/register' || req.path === '/login'){
      next();
    } else {
      res.redirect('/');
    }
  }
};
