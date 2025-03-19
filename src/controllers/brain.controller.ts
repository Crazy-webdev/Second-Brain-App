import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { brainService } from '../services/brain.service';

const brainShare = asyncHandler(async (req: Request, res: Response) => {
    await brainService.shareBrain();

    res.status(200).json({
        status: 'success',
    });
});
const getBrain = asyncHandler(async (req: Request, res: Response) => {
    await brainService.getBrain();

    res.status(200).json({
        status: 'success',
    });
});

export { brainShare, getBrain };
