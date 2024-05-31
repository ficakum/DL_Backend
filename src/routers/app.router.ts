import { Router } from "express";

import paymentRouter from "./payment.router";
import userRouter from "./user.router";
import productRouter from "./product.router";
import authenticationRouter from "./auth.router";
import imageRouter from "./image.router";
import orderRouter from "./order.router";

const router: Router = Router();

router.use("/payments", paymentRouter);
router.use("/users", userRouter);
router.use("/products", productRouter);
router.use("/authentication", authenticationRouter);
router.use("/images", imageRouter);
router.use("/orders", orderRouter);

export default router;
