import express from 'express';
import { loggerMid, loggerErrorMid } from '../middlewares';
import { getUsers, getAutoSuggestUsers, getUserById, createUser, updateUserById, deleteUserById } from '../services';
import { verifyToken } from '../services';

export const userRouter = express.Router();

userRouter.get('/', verifyToken, loggerMid.log('Get User'), loggerErrorMid.log(), getUsers);
userRouter.get('/auto-suggest', verifyToken, loggerMid.log('Get autosuggested user'), loggerErrorMid.log(), getAutoSuggestUsers);
userRouter.get('/:id', verifyToken, loggerMid.log('Get user by id'), loggerErrorMid.log(), getUserById);
userRouter.post('/create', verifyToken, loggerMid.log('Create user'), loggerErrorMid.log(), createUser);
userRouter.post('/update/:id', verifyToken, loggerMid.log('Update user by id'), loggerErrorMid.log(), updateUserById);
userRouter.delete('/delete/:id', verifyToken, loggerMid.log('Delete user'), loggerErrorMid.log(), deleteUserById);
