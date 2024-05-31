import { Router } from "express";

import orderController from "../controllers/order.controller";
import authenticationMiddleware from "../middlewares/jwt.middleware";
import authoriationMiddleware from "../middlewares/authorization.middleware";
import queryMiddleware from "../middlewares/query.middleware";
import { Roles } from "../models/user.model";

const orderRouter: Router = Router();

orderRouter.get(
  "/:id",
  authenticationMiddleware,
  authoriationMiddleware([Roles.ADMIN, Roles.CUSTOMER, Roles.VENDOR]),
  orderController.getOrder
);
orderRouter.get(
  "/",
  authenticationMiddleware,
  authoriationMiddleware([Roles.ADMIN, Roles.CUSTOMER, Roles.VENDOR]),
  queryMiddleware,
  orderController.getOrders
);
orderRouter.post(
  "/",
  authenticationMiddleware,
  authoriationMiddleware([Roles.ADMIN, Roles.CUSTOMER, Roles.VENDOR]),
  orderController.createOrder
);
orderRouter.delete(
  "/:id",
  authenticationMiddleware,
  authoriationMiddleware([Roles.ADMIN, Roles.CUSTOMER, Roles.VENDOR]),
  orderController.deleteOrder
);

export default orderRouter;
