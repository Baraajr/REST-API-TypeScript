import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';

const validateResource =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });
      next();
    } catch (error: any) {
      // Catching Zod validation error and sending the response with a 400 status
      return res.status(400).json({ errors: error.errors });
    }
  };

export default validateResource;
