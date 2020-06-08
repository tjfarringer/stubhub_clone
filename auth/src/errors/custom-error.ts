export abstract class CustomError extends Error {
  // note that an abstract class is very similar to an interface
  abstract statusCode: number;

  constructor(message: string) {
    super(message);

    // Only need to do this when extending a built-in class
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrors(): { message: string; field?: string }[];
}
