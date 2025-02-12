import { Request, Response, Express } from 'express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { version } from '../../package.json';
import log from './logger';

const options: swaggerJsDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'REST API Documentation',
      version,
      description: 'API documentation',
    },
    components: {
      securitySchemas: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes.ts', './src/schema/*.ts'], // routes and schemas
};

const swagerSpec = swaggerJsDoc(options);

const swaggerDocs = (app: Express, port: number) => {
  // swagger pages

  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swagerSpec));

  // docs in json format
  app.get('/docs.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swagerSpec);
  });

  log.info(
    `Swagger documentation is available at http://localhost:${port}/docs`
  );
};

export default swaggerDocs;
