import { NextFunction, Response, Request } from "express";

import HttpException from "../exceptions/http.exception";
import ValidationException from "../exceptions/validation.exception";
import PasswordValidator from "../models/validators/password.validator";
import authenticationService from "../services/auth.service";
import Logger from "../utils/winston.logger";
import { User } from "../models/user.model";
import { Tokens } from "../utils/types";
import UserCreateSchemaValidator from "../models/validators/createValidators/user.create.validator";
import {
  RefreshTokenRequestType,
  ResetPasswordRequestType,
  SignInRequestType,
  SignUpRequestType,
} from "./requestTypes/auth.request.types";

class AuthenticationController {
  constructor() {
    this.signUp = this.signUp.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
  }

  async getLoggedInUser(req: Request, res: Response) {
    res.status(200).json(req.user as User);
  }

  async signIn(
    req: SignInRequestType,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const {
      body: { userName, password },
    } = req;

    try {
      const tokens: Tokens = await authenticationService.signIn(
        userName,
        password
      );
      Logger.info("signIn http request");

      res.status(200).json(tokens);
    } catch (error) {
      Logger.error(
        `Error in ${__filename} - signin method: ${
          (error as HttpException).error_description
        }`
      );
      next(error);
    }
  }

  async signUp(
    req: SignUpRequestType,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { body } = req;

    try {
      const { value, error } = UserCreateSchemaValidator.validate(body);

      if (error) {
        throw new ValidationException("Object invalid", error.message);
      }

      value.password = await this.validatePassword(value.password);

      const tokens: Tokens = await authenticationService.signUp(value);
      Logger.info("signUp http request");

      res.status(200).json(tokens);
    } catch (error) {
      Logger.error(
        `Error in ${__filename} - signup method: ${
          (error as HttpException).error_description
        }`
      );
      next(error);
    }
  }

  async refreshToken(
    req: RefreshTokenRequestType,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const {
      body: { refreshToken },
    } = req;

    try {
      const tokens: Tokens = await authenticationService.refreshToken(
        refreshToken
      );
      Logger.info("refreshToken http request");

      res.status(200).json(tokens);
    } catch (error) {
      Logger.error(
        `Error in ${__filename} - refreshToken method: ${
          (error as HttpException).error_description
        }`
      );
      next(error);
    }
  }

  async resetPassword(
    req: ResetPasswordRequestType,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const {
      body: { userName, newPassword },
    } = req;

    try {
      await this.validatePassword(newPassword);

      await authenticationService.resetPassword(userName, newPassword);
      Logger.info("resetPassword http request");

      res.status(200).json();
    } catch (error) {
      Logger.error(
        `Error in ${__filename} - resetPassword method: ${
          (error as HttpException).error_description
        }`
      );
      next(error);
    }
  }

  private async validatePassword(password: string): Promise<string> {
    const { value, error } = PasswordValidator.validate(password);

    if (error) {
      throw new ValidationException(
        "Object invalid",
        "Password must contain at least one uppercase letter, one lower case letter, one special character and one number"
      );
    }

    return value;
  }
}

const authenticationController: AuthenticationController =
  new AuthenticationController();

export default authenticationController;
