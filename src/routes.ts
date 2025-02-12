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
  /**
   * @openapi
   * /healthcheck:
   *  get:
   *     tags:
   *     - Healthcheck
   *     description: Responds if the app is up and running
   *     responses:
   *       200:
   *         description: App is up and running
   */

  // route to ckeck if the app is working
  app.get('/healthcheck', (req: Request, res: Response) => {
    res.sendStatus(200);
  });

  /**
   * @openapi
   * /api/users:
   *   post:
   *     tags:
   *       - User
   *     summary: Register a user
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/createUserInput'
   *     responses:
   *       201:
   *         description: Success
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/createUserResponse'
   *       409:
   *         description: Conflict - User already exists
   *       400:
   *         description: Bad request - Invalid input
   */

  // create user route
  app.post('/api/users', validateResource(createUserSchema), createUserHandler);

  /**
   * @openapi
   * /api/Sessions:
   *   post:
   *     tags:
   *       - Session
   *     summary: create a session
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/createSessionInput'
   *     responses:
   *       201:
   *         description: Success
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/createSessionResponse'
   *       400:
   *         description: invalid email or password
   *   get:
   *     tags:
   *       - Session
   *     summary: get session
   *     param:
   *       required: true
   *     responses:
   *       200:
   *         description: get all session for current user
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/getSessionResponse'
   *       400:
   *         description: unauthorized
   *   delete:
   *     tags:
   *       - Session
   *     summary: delete a user session
   *     responses:
   *       200:
   *        description: Session deleted
   *       403:
   *        description: Forbidden
   */

  app
    .route('/api/sessions')
    .post(validateResource(createSessionSchema), createUserSessionHandler)
    .get(requireUser, getUserSessionsHandler)
    .delete(requireUser, deleteSessionHandler);

  /**
   * @openapi
   * '/api/products':
   *  post:
   *     tags:
   *     - Products
   *     summary: Create a new product
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schema/Product'
   *     responses:
   *       200:
   *         description: Product created
   *         content:
   *          application/json:
   *           schema:
   *              $ref: '#/components/schema/productResponse'
   *           example:
   *             "user": "642a0de05f16e6dad68efdad"
   *             "title": "Canon EOS 1500D DSLR Camera with 18-55mm Lens"
   *             "description": "Designed for first-time DSLR owners who want impressive results straight out of the box, capture those magic moments no matter your level with the EOS 1500D. With easy to use automatic shooting modes, large 24.1 MP sensor, Canon Camera Connect app integration and built-in feature guide, EOS 1500D is always ready to go."
   *             "price": 879.99
   *             "image": "https://i.imgur.com/QlRphfQ.jpg"
   *             "_id": "642a1cfcc1bec76d8a2e7ac2"
   *             "productId": "product_xxqm8z3eho"
   *             "createdAt": "2023-04-03T00:25:32.189Z"
   *             "updatedAt": "2023-04-03T00:25:32.189Z"
   *             "__v": 0
   */

  app
    .route('/api/products')
    .post(
      [requireUser, validateResource(createProductSchema)],
      createProductHandler
    );

  /**
   * @openapi
   * '/api/products/{productId}':
   *  get:
   *     tags:
   *     - Products
   *     summary: Get a single product by the productId
   *     parameters:
   *      - name: productId
   *        in: path
   *        description: The id of the product
   *        required: true
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *          application/json:
   *           schema:
   *              $ref: '#/components/schema/productResponse'
   *       404:
   *         description: Product not found
   *  put:
   *     tags:
   *     - Products
   *     summary: Update a single product
   *     parameters:
   *      - name: productId
   *        in: path
   *        description: The id of the product
   *        required: true
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schema/Product'
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *          application/json:
   *           schema:
   *              $ref: '#/components/schema/productResponse'
   *       403:
   *         description: Forbidden
   *       404:
   *         description: Product not found
   *  delete:
   *     tags:
   *     - Products
   *     summary: Delete a single product
   *     parameters:
   *      - name: productId
   *        in: path
   *        description: The id of the product
   *        required: true
   *     responses:
   *       200:
   *         description: Product deleted
   *       403:
   *         description: Forbidden
   *       404:
   *         description: Product not found
   */

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
