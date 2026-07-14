import { Request, Response, NextFunction } from "express"; // Importing standard definitions
// AsyncRequestHandler type
type AsyncRequestHandler = (
  req: Request,
  resp: Response,
  next: NextFunction
) => Promise<any> | any;
// asyncHandler func
const asyncHandler = (requestHandler: AsyncRequestHandler) => {
  // func for handling requestHandler
  return (req: Request, resp: Response, next: NextFunction) => {
    Promise.resolve(requestHandler(req, resp, next)).catch((err) => next(err));
  };
};

export default asyncHandler;
