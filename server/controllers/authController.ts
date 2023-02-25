import { check } from 'express-validator';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import { MongooseError } from 'mongoose';
import { User, UserInterface } from '../models/User';
import { Request, Response } from 'express';

export const loginFormValidation = [
  check('username').not().isEmpty().trim().escape(),
  check('password').not().isEmpty().trim().escape(),
];

export const loginAuthHandler = function () {
  passport.use(
    new LocalStrategy((username: string, password: string, done: Function) => {
      User.findOne(
        { username: username },
        (err: MongooseError, user: UserInterface) => {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(null, false, { message: 'Incorrect username' });
          }
          bcrypt.compare(password, user.password, (err, res) => {
            if (res) {
              // passwords match! log user in
              return done(null, user);
            } else {
              // passwords do not match!
              return done(null, false, { message: 'Incorrect password' });
            }
          });
        }
      );
    })
  );

  passport.serializeUser(function (user: any, done: Function) {
    done(null, user._id);
  });

  passport.deserializeUser(function (id: string, done: Function) {
    User.findById(id, function (err: MongooseError, user: UserInterface) {
      done(err, user);
    });
  });
};

export const authorizeUser = passport.authenticate(
  'local',
  (req: Request, res: Response) => {
    const { user } = req;

    console.log('logged in', user);

    res.send(user);
  }
);
