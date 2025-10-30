import supertest from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import createServer from '../utils/server';
import mongoose from 'mongoose';
import { createProduct } from '../service/product.service';
import { signJwt } from '../utils/jwt.utils';

const app = createServer();
const userId = new mongoose.Types.ObjectId().toString();
const productPayload = {
  user: userId,
  title: 'Canon EOS 1500D DSLR Camera with 18-55mm Lens',
  description:
    'Designed for first-time DSLR owners who want impressive results straight out of the box, capture those magic moments no matter your level with the EOS 1500D. With easy to use automatic shooting modes, large 24.1 MP sensor, Canon Camera Connect app integration and built-in feature guide, EOS 1500D is always ready to go.',
  price: 879.99,
  image: 'https://i.imgur.com/QlRphfQ.jpg',
};
const userPayload = {
  _id: userId,
  email: 'test@example.com',
  name: 'test',
};

describe('Product', () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  describe('Get Product Route', () => {
    describe('given product does not exist', () => {
      it('should return a 404 error', async () => {
        const productId = 'product-123';

        await supertest(app).get(`/api/products/${productId}`).expect(404);
      });
    });

    describe('given product exists', () => {
      it('should return the product with the given id', async () => {
        const product = await createProduct(productPayload);

        const { body, statusCode } = await supertest(app).get(
          `/api/products/${product.productId}`
        );

        expect(statusCode).toBe(200);

        expect(body.productId).toBe(product.productId);
      });
    });
  });

  describe('Create Product Route', () => {
    describe('given the user is not logged in', () => {
      it('Should return 403', async () => {
        const result = await supertest(app).post('/api/products');

        expect(result.statusCode).toBe(403);
      });
    });

    describe('given the user is  logged in', () => {
      it('Should return 200 and create the product', async () => {
        const jwt = signJwt(userPayload);

        const result = await supertest(app)
          .post('/api/products')
          .set('Authorization', 'Bearer ' + jwt)
          .send(productPayload);

        expect(result.statusCode).toBe(200);
        expect(result.body.user).toBe(userId);
      });
    });
  });
});
