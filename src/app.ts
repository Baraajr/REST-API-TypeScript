import express from 'express';
import config from 'config'; //this is a package
import logger from './utils/logger';
import connectDb from './utils/connect';
import deserializeUser from './middleware/deserializeUser';
import createServer from './utils/server';

export const app = createServer(); // exported for testing

app.use(express.json());

app.use(deserializeUser);

const port = config.get<number>('port');
app.listen(port, async () => {
  logger.info(`app is running on http://localhost:${port}`);

  await connectDb();
});
