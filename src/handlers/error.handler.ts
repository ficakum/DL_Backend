import { Request, Response, NextFunction } from "express";

import Logger from "../utils/winston.logger";
import HttpException from "../exceptions/http.exception";

const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof HttpException) {
    Logger.error(err.error_description);
    res.status(err.status).json({
      error: err.error,
      error_description: err.error_description,
    });
  } else {
    Logger.error(err.message);
    res.status(500).json({
      error: "Server failed",
      error_description: "Server is currently not working",
    });
  }
  next();
};

export default errorHandler;
