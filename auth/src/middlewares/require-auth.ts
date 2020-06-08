import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors/not-authorized-error';

// making an assumption that we will always use the currentUser function before this one
export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) {
    // code 401 -- means forbidden
    throw new NotAuthorizedError('Not Authorized');
  }
};
