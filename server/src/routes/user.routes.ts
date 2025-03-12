import express from 'express';
import { userSignup } from '../controllers/user.controller';
import { validate } from '../middlewares/validate.middleware';
import { userSignupSchema } from '../schemas/user.schema';

export const userRouter = express.Router();

userRouter.post('/signup',validate(userSignupSchema),userSignup);