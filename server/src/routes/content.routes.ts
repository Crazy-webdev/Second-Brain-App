import express from 'express';
import { addContent, deleteContent, getContent, updateContent } from '../controllers/content.controller';

export const contentRouter = express.Router();


contentRouter.post('/',addContent);

contentRouter.get('/all',getContent);

contentRouter.put('/:id',updateContent);

contentRouter.delete('/:id',deleteContent);
