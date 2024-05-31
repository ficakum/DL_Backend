import HttpException from "../exceptions/http.exception";
import { NextFunction, Response } from "express";
import { Order } from "../models/order.model";
import paymentService from "../services/payment.service";
import Logger from "../utils/winston.logger";
import { PayOrderRequestType } from "./requestTypes/payment.request.types";

class PaymentController {
  async payOrder(
    req: PayOrderRequestType,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const {
      params: { id },
    } = req;

    try {
      const payedOrder: Order = await paymentService.payOrder(id);
      Logger.info(`order with id: ${id} payed`);

      res.status(200).json(payedOrder);
    } catch (error) {
      Logger.error(
        `Error in ${__filename} - updateOrder method: ${
          (error as HttpException).error_description
        }`
      );
      next(error);
    }
  }
}

const paymentController: PaymentController = new PaymentController();

export default paymentController;
