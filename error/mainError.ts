export enum HTTP {
  OK = 200,
  CREATE = 201,
  BAD = 404,
  DELETE = 204,
  UPDATE = 203,
}

interface iError {
  name: string;
  message: string;
  status: HTTP;
  success: boolean;
}

export class mainError extends Error {
  public readonly name: string;
  public readonly message: string;
  public readonly status: HTTP;
  public readonly success: boolean = false;

  constructor(args: iError) {
    super(args.message);

    Object.setPrototypeOf(this, new.target.prototype);

    this.name = args.name;
    this.message = args.message;
    this.status = args.status;

    if (this.success === undefined) {
      this.success = args.success;
    }
    Error.captureStackTrace(this);
  }
}
