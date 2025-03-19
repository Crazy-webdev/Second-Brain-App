import express from 'express';
import {
    addContent,
    deleteContent,
    getContent,
    updateContent,
} from '../controllers/content.controller';
import { authenticate } from '../middlewares/authenticate.middleware';
import { validate } from '../middlewares/validate.middleware';
import { ContentAddSchema, UpdateContentSchema } from '../schemas/content.schema';


export const contentRouter = express.Router();

contentRouter.use(authenticate)

contentRouter.post('/add',validate(ContentAddSchema), addContent);

contentRouter.get('/all', getContent);

contentRouter.put('/:id',validate(UpdateContentSchema), updateContent);

contentRouter.delete('/:id', deleteContent);
