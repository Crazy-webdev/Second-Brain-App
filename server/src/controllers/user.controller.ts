import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { userService } from '../services/user.service';

const userSignup = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    await userService.userSignup(req.body);

    res.status(201).json({
        status: 'success',
    });
});
const userSignin = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { token } = await userService.userSignin(req.body);
    res.setHeader('Authorization', `Bearer ${token}`);

    res.status(201).json({
        status: 'success',
    });
});

export { userSignup, userSignin };
