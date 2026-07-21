class apiError extends Error {
  // type
  statusCode: number;
  message: string;
  errors: any[];
  data: any;
  success: boolean;
  //   Constructor
  constructor(
    statusCode: number,
    message: string = "Something went wrong",
    errors: any[] = [],
    errorStack: string = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.errors = errors;
    this.data = null;
    this.success = false;
    if (errorStack) {
      this.stack = errorStack;
    } else {
      (Error as any).captureStackTrace(this, this.constructor);
    }
  }
}
export { apiError };
