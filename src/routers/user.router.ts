import { Router } from "express";

import userController from "../controllers/user.controller";
import authenticationMiddleware from "../middlewares/jwt.middleware";
import authoriationMiddleware from "../middlewares/authorization.middleware";
import queryMiddleware from "../middlewares/query.middleware";
import { Roles } from "../models/user.model";

const userRouter: Router = Router();

userRouter.get(
  "/logged-user",
  authenticationMiddleware,
  userController.getLoggedInUser
);
userRouter.get("/:id", authenticationMiddleware, userController.getUser);
userRouter.get(
  "/",
  authenticationMiddleware,
  authoriationMiddleware([Roles.ADMIN]),
  queryMiddleware,
  userController.getUsers
);
userRouter.post(
  "/:id",
  authenticationMiddleware,
  userController.changePassword
);
userRouter.patch("/:id", authenticationMiddleware, userController.updateUser);
userRouter.delete(
  "/:id",
  authenticationMiddleware,
  authoriationMiddleware([Roles.ADMIN]),
  userController.deleteUser
);

export default userRouter;
