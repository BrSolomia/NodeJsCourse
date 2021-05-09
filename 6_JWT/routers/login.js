import express from 'express';
import { loggerMid, loggerErrorMid } from '../middlewares';
import { login } from '../services';

export const loginRouter = express.Router();

loginRouter.post('/', loggerMid.log('Login'), loggerErrorMid.log(), login );