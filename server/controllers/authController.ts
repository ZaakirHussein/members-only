import dotenv from 'dotenv';
import { check } from 'express-validator';
import { MongooseError } from 'mongoose';
import { User, UserInterface } from '../models/User';
import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';

dotenv.config();

const secretJWTKey = process.env.JWT_SECRET as string;

export const loginFormValidation = [
  check('username').not().isEmpty().trim().escape(),
  check('password').not().isEmpty().trim().escape(),
];

export const jwtStrat = new JWTStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secretJWTKey,
  },
  function (payload, done) {
    User.findOne(
      { id: payload._id },
      function (err: MongooseError, user: UserInterface) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: 'This user does not exist' });
        }
      }
    );
  }
);

export const authenticateUser = (req: Request, res: Response) => {
  const { username, password } = req.body;

  User.findOne(
    { username: username },
    (err: MongooseError, user: UserInterface) => {
      if (err) {
        return res.status(404).json({ mongooseErr: err });
      }
      if (!user) {
        return res.status(401).json({ message: 'Incorrect username' });
      }
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (isMatch) {
          // passwords match! log user in
          console.log('passwords match! log user in');
          const payload = {
            id: user._id,
            username: user.username,
            iat: new Date().getTime(),
            exp: new Date().setDate(new Date().getDate() + 1),
          };
          // Sign token
          sign(
            payload,
            secretJWTKey,
            {
              expiresIn: '7 days',
            },
            (err, token) => {
              res.json({
                success: true,
                token: 'Bearer ' + token,
              });
            }
          );
        } else {
          // passwords do not match!
          return res.status(401).json({ message: 'Incorrect password' });
        }
      });
    }
  );
};
