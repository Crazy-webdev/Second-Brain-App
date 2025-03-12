import express from 'express';
import { userSignin, userSignup } from '../controllers/user.controller';
import { validate } from '../middlewares/validate.middleware';
import { userSigninSchema, userSignupSchema } from '../schemas/user.schema';

export const userRouter = express.Router();

userRouter.post('/signup',validate(userSignupSchema),userSignup);

userRouter.post('/signin',validate(userSigninSchema),userSignin);