import express from 'express';
import { brainShare, getBrain } from '../controllers/brain.controller';
import { authenticate } from '../middlewares/authenticate.middleware';

export const brainRouter = express.Router();

brainRouter.post('/share',authenticate,brainShare);

brainRouter.get('/:shareLink',getBrain);
