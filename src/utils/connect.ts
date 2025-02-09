import mongoose from 'mongoose';
import config from 'config'; // package to read the variables inside config folder
import logger from '../utils/logger';

export default async function connectDb() {
  const dbUri = config.get<string>('dbUri');

  try {
    const db = await mongoose.connect(dbUri);
    logger.info(`Database Connected successfully`);
  } catch (error) {
    logger.error(error);
    process.exit(1); // exit with error
  }
}
