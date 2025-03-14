import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { connectDb } from './config/db';
import { userRouter } from './routes/user.routes';
import { limiter } from './middlewares/rateLimiter.middleware';
import { errorHandler } from './utils/errorHandler';
import { contentRouter } from './routes/content.routes';
import { brainRouter } from './routes/brain.routes';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const port = process.env.PORT;

connectDb();

app.use(express.json());

app.use(limiter);

app.use('/api/v1/user', userRouter);

app.use('/api/v1/content',contentRouter);

app.use('/api/v1/brain',brainRouter)

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});
