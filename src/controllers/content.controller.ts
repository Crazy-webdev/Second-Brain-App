import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { contentService } from '../services/content.service';

const addContent = asyncHandler(async (req: Request, res: Response):Promise<void> => {
    const userId = req.user?._id;
    const data = req.body;
    if (!userId) {
        throw new Error('Trouble getting user id');
    }
    await contentService.addContent(userId,data);

    res.status(201).json({
        status: 'success',
    });
});
const updateContent = asyncHandler(async (req: Request, res: Response):Promise<void> => {
    const contentId = req.params.id;
    const data = req.body;
    await contentService.updateContent(contentId,data);

    res.status(200).json({
        status: 'success',
    });
});
const deleteContent = asyncHandler(async (req: Request, res: Response):Promise<void> => {
    const contentId = req.params.id;
    const response = await contentService.deleteContent(contentId);

    res.status(200).json({
        status: 'success',
        response:response
    });
});
const getContent = asyncHandler(async (req: Request, res: Response):Promise<void> => {
    const userId = req.user?._id;
    if (!userId) {
        throw new Error('Trouble getting user id');
    }
    const response = await contentService.getContent(userId);

    res.status(200).json({
        status: 'success',
        respone:response,
    });
});

export { addContent, updateContent, deleteContent, getContent };
