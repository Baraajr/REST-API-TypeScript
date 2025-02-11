import express from 'express';
import client from 'prom-client'; //prometheus server
import log from './logger';

const app = express();

export const restResponseTimeHistogram = new client.Histogram({
  name: 'res_response_time_duration_seconds',
  help: 'REST Response time in seconds',
  labelNames: ['method', 'route', 'statusCode'],
});

export const databaseResponseTimeHistogram = new client.Histogram({
  name: 'db_response_time_duration_seconds',
  help: 'database Response time in seconds',
  labelNames: ['operation', 'success'],
});

export function startMetricServer() {
  const collectDafaultMetrics = client.collectDefaultMetrics;

  collectDafaultMetrics();

  app.get('/metrics', async (req, res) => {
    res.setHeader('Content-Type', client.register.contentType);
    return res.send(await client.register.metrics());
  });

  app.listen(9100, () => {
    log.info('metric server is listening on http://localhost:9100');
  });
}
