import { Router } from "express";

import paymentController from "../controllers/payment.controller";
import authenticationMiddleware from "../middlewares/jwt.middleware";
import authoriationMiddleware from "../middlewares/authorization.middleware";

const paymentRouter: Router = Router();

export default paymentRouter;
