import { Router, Request, Response, NextFunction } from 'express';
import { errorResults } from '../utils/utiles';
import {
  loginFormValidation,
  authorizeUser,
} from '../controllers/authController';

export const authRoutes = Router();

authRoutes.post(
  '/',
  loginFormValidation,
  errorResults,
  function (req: Request, res: Response, next: NextFunction) {
    console.log(req.body);
    next();
  },
  authorizeUser
);
