import { body } from "express-validator";
import { Request, Response } from "express";
import passport from "passport";
import { LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import { db } from "../server";

export const login_validation = [
  body("username").not().isEmpty().trim().escape(),
  body("password").not().isEmpty().trim().escape(),
];

export const loginHandler = function (req: Request, res: Response) {};
