import { ValidationError, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const errorFormatter = ({
  location,
  msg,
  param,
  value,
  nestedErrors,
}: ValidationError) => {
  // Build your resulting errors however you want! String, object, whatever - it works!
  return `${location}[${param}]: ${msg}`;
};

export const errorResults = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = validationResult(req).formatWith(errorFormatter);
  console.log(result);

  if (!result.isEmpty()) {
    console.log(result.array());
    return res.status(404).json({ errors: result.array() });
  }

  console.log('passed validation');

  next();
};
