import { Router, Request, Response, NextFunction } from "express";
import { validationResult, ValidationError } from "express-validator";
import { errorFormatter } from "../utils/utiles";
import { form_validation, loginHandler } from "../controllers/formController";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";

export const formRouter = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "--" + file.originalname);
  },
});

const upload = multer({ storage: storage });

formRouter.post(
  "/",
  upload.single("profilePicture"),
  form_validation,
  (req: Request, res: Response, next: NextFunction) => {
    const result = validationResult(req).formatWith(errorFormatter);
    if (!result.isEmpty()) {
      console.log(result.array());
      return res.json({ errors: result.array() });
    }
    next();
  },
  loginHandler
);

formRouter.get("/", (req, res) => {
  res.send("Signup form");
});

formRouter.get("/about", (req, res) => {
  res.send("About this and that");
});
