import { Express, Request, Response } from 'express';
import { createUserHandler } from './controller/userController';
import {
  createUserSessionHandler,
  getUserSessionsHandler,
  deleteSessionHandler,
} from './controller/session.controller';
import validateResource from './middleware/validateResource'; // a function that takes a schema
import { createUserSchema } from './schema/user.schema';
import { createSessionSchema } from './schema/session.schema';
import deserializeUser from './middleware/deserializeUser';
import requireUser from './middleware/requireUser';
import {
  createProductSchema,
  deleteProductSchema,
  getProductSchema,
  updateProductSchema,
} from './schema/product.schema';
import {
  createProductHandler,
  deleteProductHandler,
  getProductHandler,
  updateProductHandler,
} from './controller/product.controllers';

const routes = (app: Express) => {
  // route to ckeck if the app is working
  app.get('/healthcheck', (req: Request, res: Response) => {
    res.sendStatus(200);
  });

  // create user route
  app.post('/api/users', validateResource(createUserSchema), createUserHandler);

  app
    .route('/api/sessions')
    .post(validateResource(createSessionSchema), createUserSessionHandler)
    .get(requireUser, getUserSessionsHandler)
    .delete(requireUser, deleteSessionHandler);

  app
    .route('/api/products')
    .post(
      [requireUser, validateResource(createProductSchema)],
      createProductHandler
    );

  app
    .route('/api/products/:productId')
    .put(
      [requireUser, validateResource(updateProductSchema)],
      updateProductHandler
    )
    .get(validateResource(getProductSchema), getProductHandler)
    .delete(
      [requireUser, validateResource(deleteProductSchema)],
      deleteProductHandler
    );
};

export default routes;
