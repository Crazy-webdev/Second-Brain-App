import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

export const authenticate = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({
            status: 'fail',
            message: 'Invalid or expired token',
        });
        return;
    }
    const token = authHeader?.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { id: string };

    req.user = { _id: decoded.id };

    next();
});
