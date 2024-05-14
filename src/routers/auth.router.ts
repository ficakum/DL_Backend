import { Router } from "express";

import authenticationController from "../controllers/auth.controller";
import authorizationMiddleware from "../middlewares/authorization.middleware";

const authRouter: Router = Router();

export default authRouter;
