import { NextFunction, Request, Response } from "express";

const authorizationMiddleware: (
  req: Request,
  _res: Response,
  next: NextFunction
) => void = (req: Request, _res: Response, next: NextFunction): void => {};

export default authorizationMiddleware;
