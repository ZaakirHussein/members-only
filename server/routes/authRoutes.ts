import { Router } from 'express';
import { loginFormValidation } from '../controllers/authController';
import { errorResults } from '../utils/utiles';
import { authenticateUser } from '../controllers/authController';

export const authRoutes = Router();

authRoutes.post('/', loginFormValidation, errorResults, authenticateUser);
