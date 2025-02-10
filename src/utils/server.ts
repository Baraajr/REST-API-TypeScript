import express from 'express';
import deserializeUser from '../middleware/deserializeUser';
import routes from '../routes';

export default function createServer() {
  const app = express(); // exported for testing

  app.use(express.json());

  app.use(deserializeUser);

  routes(app);

  return app;
}
