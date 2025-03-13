import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { contentService } from '../services/content.service';

const addContent = asyncHandler(async (req: Request, res: Response) => {
    await contentService.addContent();

    res.status(201).json({
        status: 'success',
    });
});
const updateContent = asyncHandler(async (req: Request, res: Response) => {
    await contentService.updateContent();

    res.status(200).json({
        status: 'success',
    });
});
const deleteContent = asyncHandler(async (req: Request, res: Response) => {
    await contentService.deleteContent();

    res.status(200).json({
        status: 'success',
    });
});
const getContent = asyncHandler(async (req: Request, res: Response) => {
    await contentService.getContent();

    res.status(200).json({
        status: 'success',
    });
});

export { addContent, updateContent, deleteContent, getContent };
