import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface userPayload {
  id: string;
  email: string;
}

// this is basically editing an exisiting interface
declare global {
  namespace Express {
    interface Request {
      currentUser?: userPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // recall:  ? checks if the object is defined
  if (!req.session?.jwt) {
    return next();
  }

  // decode jwt
  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as userPayload;
    req.currentUser = payload;
  } catch (err) {}

  next();
};
