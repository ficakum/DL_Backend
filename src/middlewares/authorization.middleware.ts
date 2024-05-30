import ForbiddenException from "exceptions/forbidden.exception";
import HttpException from "exceptions/http.exception";
import UnauthorizedException from "exceptions/unauthorized.exception";
import { NextFunction, Request, Response } from "express";
import { Role, User } from "models/user.model";

const authorizationMiddleware: (
  authorizedUsers: Role[]
) => (req: Request, _res: Response, next: NextFunction) => void = (
  authorizedUsers: Role[]
) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new UnauthorizedException(
          "Unauthorized",
          "Not authorized for this action"
        );
      }
      const user: User = req.user as User;

      if (authorizedUsers.includes(user.userType)) {
        next();
      } else {
        throw new ForbiddenException("Forbidden", "Cannot execute this action");
      }
    } catch (err) {
      next(err);
    }
  };
};

export default authorizationMiddleware;
