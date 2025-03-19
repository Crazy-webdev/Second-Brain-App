import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { brainService } from '../services/brain.service';

const brainShare = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { share } = req.body;
    const userId = req.user?._id;

    if (!userId) {
        throw new Error('Trouble getting user id, please try again');
    }
    const response = await brainService.shareBrain(userId, share);
    if (response) {
        res.status(200).json({
            status: 'success',
            message: 'Updated shareable link',
            response: `http://localhost:3001/api/v1/brain/${response}`,
        });
    }
    else {
        res.status(200).json({
            status: 'success',
            message: 'Deleted shareable link',
        });
    }
});
const getBrain = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const hash = req.params.shareLink;
    const response = await brainService.getBrain(hash);

    res.status(200).json({
        status: 'success',
        response: response,
    });
});

export { brainShare, getBrain };
