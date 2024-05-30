import { Router } from "express";

import paymentController from "../controllers/payment.controller";
import authenticationMiddleware from "../middlewares/jwt.middleware";
import authoriationMiddleware from "../middlewares/authorization.middleware";
import { Roles } from "models/user.model";

const paymentRouter: Router = Router();

paymentRouter.patch(
  "/:id",
  authenticationMiddleware,
  authoriationMiddleware([Roles.ADMIN]),
  paymentController.payOrder
);

export default paymentRouter;
