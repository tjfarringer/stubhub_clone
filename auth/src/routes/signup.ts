import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';

import { validateRequest } from '../middlewares/validate-request';
import { BadRequestError } from '../errors/bad-request-error';

const router = express.Router();

// we should be recieving the email and pw from the req.body
router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    // Check if someone is in our db
    if (existingUser) {
      throw new BadRequestError('Email in use');
    }

    const user = User.build({ email, password });
    // this persists the user to mongodb
    await user.save();

    // after saving the user, give them a JWT
    const userJWT = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      // typescript never assumes a env variable is filled
      // Thus we need to check to make sure this is filled in
      // Note that we are checking this when we start the app
      // Thus we put the ! mark, which tells TS to not worry about this
      process.env.JWT_KEY!
    );

    // store JWT on session object
    req.session = {
      jwt: userJWT,
    };

    // Note:  we wanted to clean up the json code
    // that is sent back to the client
    res.status(201).send(user);
  }
);

export { router as signupRouter };
