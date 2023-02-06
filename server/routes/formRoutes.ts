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

formRouter.post(
  "/",
  upload.single("profilePicture"),
  form_validation,
  (req: Request, res: Response, next: NextFunction) => {
    const result = validationResult(req).formatWith(errorFormatter);
    console.log("result above");
    if (!result.isEmpty()) {
      console.log(result.array());
      return res.status(400).json({ errors: result.array() });
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
