import { Router } from "express";

import productController from "../controllers/product.controller";
import authenticationMiddleware from "../middlewares/jwt.middleware";
import authoriationMiddleware from "../middlewares/authorization.middleware";

const productRouter: Router = Router();

export default productRouter;
