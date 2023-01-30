import express from "express";
import multer from "multer";
import bcrypt from "bcryptjs";
import { User } from "../models/User";
import { body } from "express-validator";
import { Request, Response, NextFunction } from "express";

export function form_validation() {
  body("username").not().isEmpty().trim().escape(),
    body("first_name").not().isEmpty().trim().escape(),
    body("last_name").not().isEmpty().trim().escape(),
    body("email").isEmail().normalizeEmail(),
    body("password")
      .isLength({ min: 7 })
      .withMessage("Password must be a minimum of 7 characters"),
    body("confirmPassword")
      .isLength({ min: 7 })
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Password confirmation does not match password");
        }

        // Indicates the success of this synchronous custom validator
        return true;
      });
}

const upload = multer({ dest: "./frontend/public/uploads" });

export function loginHandler() {
  upload.single("profilePicture"),
    (req: Request, res: Response, next: NextFunction) => {
      // req.file is the `profilePicture` file
      // req.body will contain the text fields, if there were any

      bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
        if (err) {
          console.log(err);
        } // otherwise, store hashedPassword in DB
        const user = new User({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          username: req.body.username,
          email: req.body.email,
          password: hashedPassword,
          profilePicture: req.file,
        }).save((err) => {
          if (err) {
            return next(err);
          }
          res.redirect("/");
        });
      });
    };
}
