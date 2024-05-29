import HttpException from "exceptions/http.exception";
import { NextFunction, Request, Response } from "express";
import { User } from "models/user.model";

const authorizationMiddleware: (
  req: Request,
  _res: Response,
  next: NextFunction,
  _authorizedUsers: string[]
) => void = (
  req: Request,
  _res: Response,
  next: NextFunction,
  authorizedUsers: string[]
): void => {
  try {
    if (!req.user) {
      throw new HttpException(
        401,
        "Unauthorized",
        "Not authorized for this action"
      );
    }
    const user: User = req.user as User;

    if (authorizedUsers.includes(user.userType)) {
      next();
    } else {
      throw new HttpException(403, "Forbidden", "Cannot execute this action");
    }
  } catch (err) {
    next(err);
  }
};

export default authorizationMiddleware;
