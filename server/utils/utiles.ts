import { ValidationError } from "express-validator";

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
