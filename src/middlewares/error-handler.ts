import { Request, Response, NextFunction } from 'express';
import { DatabaseConnectionError } from '../errors/database-connection-error';
import { RequestValidationError } from '../errors/request-validation-error';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('Something went wrong', err);

  if (err instanceof RequestValidationError) {
    console.log('handling this error as a request validation error');
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }
  if (err instanceof DatabaseConnectionError) {
    console.log('handling this error as a database connection error');
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  res.status(400).send({
    errors: [
      {
        message: 'Something went wrong',
      },
    ],
  });
};
