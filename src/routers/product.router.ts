import { Router } from "express";

import productController from "../controllers/product.controller";
import authenticationMiddleware from "../middlewares/jwt.middleware";
import authoriationMiddleware from "../middlewares/authorization.middleware";
import queryMiddleware from "../middlewares/query.middleware";
import { Roles } from "../models/user.model";

const productRouter: Router = Router();

productRouter.get(
  "/:id",
  authenticationMiddleware,
  authoriationMiddleware([Roles.ADMIN, Roles.CUSTOMER, Roles.VENDOR]),
  productController.getProduct
);
productRouter.get(
  "/",
  authenticationMiddleware,
  authoriationMiddleware([Roles.ADMIN, Roles.CUSTOMER, Roles.VENDOR]),
  queryMiddleware,
  productController.getProducts
);
productRouter.post(
  "/ids",
  authenticationMiddleware,
  authoriationMiddleware([Roles.ADMIN, Roles.CUSTOMER, Roles.VENDOR]),
  queryMiddleware,
  productController.getProductsByIds
);
productRouter.post(
  "/",
  authenticationMiddleware,
  authoriationMiddleware([Roles.ADMIN, Roles.VENDOR]),
  productController.createProduct
);
productRouter.patch(
  "/:id",
  authenticationMiddleware,
  authoriationMiddleware([Roles.ADMIN, Roles.CUSTOMER, Roles.VENDOR]),
  productController.updateProduct
);
productRouter.delete(
  "/:id",
  authenticationMiddleware,
  authoriationMiddleware([Roles.ADMIN, Roles.CUSTOMER, Roles.VENDOR]),
  productController.deleteProduct
);

export default productRouter;
