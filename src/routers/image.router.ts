import { Router } from "express";

import imageController from "controllers/image.controller";
import authenticationMiddleware from "../middlewares/jwt.middleware";
import authoriationMiddleware from "../middlewares/authorization.middleware";
import { upload } from "middlewares/image.upload.middleware";
import { Roles } from "models/user.model";

const imageRouter: Router = Router();

imageRouter.get(
  "/",
  authenticationMiddleware,
  authoriationMiddleware([Roles.ADMIN, Roles.CUSTOMER, Roles.VENDOR]),
  upload.single("image"),
  imageController.getSimilarProductsByImages
);

export default imageRouter;
