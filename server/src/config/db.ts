import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

const pathResolve = path.resolve(__dirname, '../../.env');
if (fs.existsSync(pathResolve)) {
  dotenv.config({ path: pathResolve });
} else {
  console.warn('.env file not found, using environment variables');
}

export const connectDb = async () => {
  const connectionString = process.env.DB_URL;
  if (!connectionString) {
    throw new Error('DATABASE URL not found in environment variables');
  }
  try {
    await mongoose.connect(connectionString);

    console.log(`Database connected successfully`);
  } catch (err) {
    console.error(`Failed to connect to database:`, err);
    throw err;
  }
};
