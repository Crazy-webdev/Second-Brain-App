import express from 'express';
import { brainShare, getBrain } from '../controllers/brain.controller';

export const brainRouter = express.Router();

brainRouter.post('/share',brainShare);

brainRouter.get('/:shareLink',getBrain);