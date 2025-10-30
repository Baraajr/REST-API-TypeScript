import config from 'config';
import express, { Response, Request } from 'express';
import deserializeUser from '../middleware/deserializeUser';
import routes from '../routes';
import { restResponseTimeHistogram, startMetricServer } from './metrics'; // prometheus server
import responseTime from 'response-time'; // for metrics

export default function createServer() {
  const app = express(); // exported for testing

  app.use(express.json());

  app.use(deserializeUser);

  app.use(
    responseTime((req: Request, res: Response, time: number) => {
      if (req?.route?.pat)
        restResponseTimeHistogram.observe(
          {
            method: req.method,
            route: req.route.path,
            statusCode: res.statusCode,
          },
          time * 1000 // seconds
        );
    })
  ); // for metrics

  routes(app);

  if (config.get<string>('environment') === 'development') {
    startMetricServer();
  }
  return app;
}
