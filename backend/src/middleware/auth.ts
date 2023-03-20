import { Request, Response, NextFunction } from 'express';

// Check that request object has a valid session
export const checkSession = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.user != null) {
    if (req.path === '/register' || req.path === '/login') return next();
    next();
  } else {
    res.redirect('/');
  }
};
