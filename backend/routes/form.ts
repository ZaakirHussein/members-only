import { Router } from "express";
import { validationResult, ValidationError } from "express-validator";
import { form_validation, loginHandler } from "../controllers/formController";

export const router = Router();

router.post("/", form_validation, (req, res) => {
  const errorFormatter = ({
    location,
    msg,
    param,
    value,
    nestedErrors,
  }: ValidationError) => {
    // Build your resulting errors however you want! String, object, whatever - it works!
    return `${location}[${param}]: ${msg}`;
  };

  const result = validationResult(req).formatWith(errorFormatter);

  if (!result.isEmpty()) {
    // Response will contain something like
    // { errors: [ "body[password]: must be at least 10 chars long" ] }
    return res.json({ errors: result.array() });
  } else {
    loginHandler();
  }
});
