import { CustomError } from './custom-error';

export class NotAuthorizedError extends CustomError {
  // code 401 means forbidden
  statusCode = 401;

  constructor(public message: string) {
    super(message);

    // Only need to do this when extending a built-in class
    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeErrors() {
    return [{ message: 'Not authorized' }];
  }
}
