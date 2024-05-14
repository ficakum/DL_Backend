import { Router } from "express";

import userController from "../controllers/user.controller";
import authenticationMiddleware from "../middlewares/jwt.middleware";
import authoriationMiddleware from "../middlewares/authorization.middleware";

const userRouter: Router = Router();

export default userRouter;
