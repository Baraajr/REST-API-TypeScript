import { Request, Response } from 'express';
import logger from '../utils/logger'; // Assuming logger is set up correctly
import { createUser } from '../service/user.service';
import { CreateUserInput } from '../schema/user.schema';

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput['body']>, // now we defined the body object type
  res: Response
) {
  try {
    const user = await createUser(req.body);
    res.status(201).json(user); // Send the created user with 201 status code
  } catch (error: any) {
    // Log the error details
    logger.error(error);

    // Send a structured error response
    res.status(400).json({
      message: 'An error occurred while creating the user',
      details: error.message, // Include error message for debugging
    });
  }
}
