import { object, string } from 'zod';

/**
 * @openapi
 * components:
 *   schemas:
 *     createSessionInput:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           default: youremail@example.com
 *         password:
 *            type: string
 *            default: yourpassword
 *     createSessionResponse:
 *       type: object
 *       properties:
 *         accessToken:
 *           type: string
 *         refreshToken:
 *           type: string
 *     getSessionResponse:
 *       type: array
 *       items:
 *         type: object
 *       required:
 *         - user
 *         - valid
 *         - userAgent
 *         - createdAt
 *         - updatedAt
 *       properties:
 *         _id:
 *           type: string
 *         user:
 *           type: string
 *         valid:
 *           type: boolean
 *         userAgent:
 *           type: string
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 *         __v:
 *           type: number
 */

export const createSessionSchema = object({
  body: object({
    email: string({
      required_error: 'Email is required',
    }),
    password: string({
      required_error: 'assword is required',
    }),
  }),
});
