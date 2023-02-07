import { Router, Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { errorFormatter } from "../utils/utiles";
import {
  signup_validation,
  signupHandler,
} from "../controllers/signupController";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";

export const signupRoutes = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, uuidv4() + "-" + fileName);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

signupRoutes.post(
  "/",
  upload.single("profilePicture"),
  signup_validation,
  (req: Request, res: Response, next: NextFunction) => {
    const result = validationResult(req).formatWith(errorFormatter);
    console.log("result above");
    if (!result.isEmpty()) {
      console.log(result.array());
      return res.status(400).json({ errors: result.array() });
    }
    next();
  },
  signupHandler
);
