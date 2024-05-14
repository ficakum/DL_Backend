import { Router } from "express";

import paymentRouter from "./payment.router";
import userRouter from "./user.router";
import productRouter from "./product.router";
import authenticationRouter from "./auth.router";

const router: Router = Router();

router.use("/payments", paymentRouter);
router.use("/users", userRouter);
router.use("/products", productRouter);
router.use("/authentication", authenticationRouter);

export default router;
