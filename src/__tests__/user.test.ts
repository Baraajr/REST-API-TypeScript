import mongoose from 'mongoose';
import * as userService from '../service/user.service';
import * as sessionService from '../service/session.service';
import supertest from 'supertest';
import createServer from '../utils/server';
import { createUserSessionHandler } from '../controller/session.controller';
import { access } from 'fs';
/**
 * we have two mocks with the same name createUserServiceMock
 *   ● user › user registration › given password do not match › should return a 400
      expect(jest.fn()).not.toHaveBeenCalled()
      Expected number of calls: 0
      Received number of calls: 1
    1: {"email": "test@example.com", "name": "test", "password": "test123", "passwordConfirmation": "test123"}
 * 
    we need to remove mocks between test (after each test)
 */

const app = createServer();
const userInput = {
  email: 'test@example.com',
  name: 'test',
  password: 'test123',
  passwordConfirmation: 'test123',
};

const userId = new mongoose.Types.ObjectId().toString();

const userPayload = {
  _id: userId,
  email: 'test@example.com',
  name: 'test',
};

const sessionPayload = {
  _id: new mongoose.Types.ObjectId().toString(),
  user: userId,
  valid: true,
  userAgent: 'PostmanRuntime/7.28.4',
  createdAt: new Date('2021-09-30T13:31:07.674Z'),
  updatedAt: new Date('2021-09-30T13:31:07.674Z'),
  __v: 0,
};

// mocking services
describe('user', () => {
  /**
   * user registration
   *    the username and password get validated
   */

  // cleared mocks in the config file
  // afterEach(() => {
  //   jest.clearAllMocks(); //clear mocked functions
  // });
  describe('user registration', () => {
    describe('given username and password are valid', () => {
      it('should return the user payload', async () => {
        const createUserServiceMock = jest
          .spyOn(userService, 'createUser')
          // @ts-ignore
          .mockReturnValue(userPayload);

        const { statusCode, body } = await supertest(app)
          .post('/api/users')
          .send(userInput);
        expect(statusCode).toEqual(201);

        expect(body).toEqual(userPayload);

        expect(createUserServiceMock).toHaveBeenCalledWith(userInput);
      });
    });

    describe('given password do not match', () => {
      it('should return a 400', async () => {
        const createUserServiceMock = jest
          .spyOn(userService, 'createUser')
          // @ts-ignore
          .mockReturnValue(userPayload);

        const { statusCode, body } = await supertest(app)
          .post('/api/users')
          .send({ ...userInput, passwordConfirmation: 'doesnotmatch' });
        expect(statusCode).toEqual(400);

        expect(body.errors[0].message).toEqual('Passwords do not match');

        expect(createUserServiceMock).not.toHaveBeenCalled();
      });
    });

    describe('given user service throws', () => {
      it('should return 400', async () => {
        // An error occurred while creating the user

        const createUserServiceMock = jest
          .spyOn(userService, 'createUser')
          // @ts-ignore
          .mockRejectedValue('oh no :(');

        const { statusCode, body } = await supertest(app)
          .post('/api/users')
          .send(userInput);
        expect(statusCode).toEqual(400);

        expect(createUserServiceMock).toHaveBeenCalled();
      });
    });
  });

  describe('create user session', () => {
    describe('given valid username and password', () => {
      it('should return access and refresh token', async () => {
        const createUserServiceMock = jest
          .spyOn(userService, 'validatePassword')
          // @ts-ignore
          .mockReturnValue(userPayload);

        jest
          .spyOn(sessionService, 'createSession')
          // @ts-ignore
          .mockReturnValue(sessionPayload);

        const req = {
          get: () => {
            return 'a user agent';
          },
          body: {
            email: 'test@example.com',
            password: 'test123',
          },
        };

        const send = jest.fn();

        const res = { send };

        // @ts-ignore
        await createUserSessionHandler(req, res);

        expect(send).toHaveBeenCalledWith({
          accessToken: expect.any(String),
          refreshToken: expect.any(String),
        });
      });
    });
  });
});
