import bcrypt from 'bcryptjs';
import { User } from '../models/User';
import { body } from 'express-validator';
import { Request, Response } from 'express';

export const signup_validation = [
  body('username').not().isEmpty().trim().escape(),
  body('firstName').not().isEmpty().trim().escape(),
  body('lastName').not().isEmpty().trim().escape(),
  body('email').isEmail().normalizeEmail(),
  body('password')
    .isLength({ min: 7 })
    .withMessage('Password must be a minimum of 7 characters'),
  body('confirmPassword')
    .isLength({ min: 7 })
    .withMessage('Password must be a minimum of 7 characters')
    .custom((value, { req }) => {
      if (value != req.body.password) {
        throw new Error('Password confirmation does not match password');
      }
      return true;
    }),
];

export const signupHandler = function (req: Request, res: Response) {
  const url = req.protocol + '://' + req.get('host');

  bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
    if (err) {
      console.log(err);
    } // otherwise, store hashedPassword in DB
    User.create({
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      profilePicture: url + '/public/uploads/' + req.file?.filename,
    })
      .then((user) => {
        res.json({ msg: 'User added successfully' + user });
      })
      .catch((err) =>
        res.status(400).json({ error: 'Unable to add this user' + err })
      );
  });
};
