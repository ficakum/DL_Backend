import { NextFunction, Response } from "express";

import Logger from "../utils/winston.logger";
import HttpException from "../exceptions/http.exception";
import { Order } from "../models/order.model";
import orderService from "../services/order.service";
import { ItemsPage } from "../utils/types";
import OrderUpdateSchemaValidator from "../models/validators/updateValidators/order.update.validator";
import ValidationException from "../exceptions/validation.exception";
import {
  DeleteOrderRequestType,
  GetOrderRequestType,
  GetOrdersRequestType,
  UpdateOrderRequestType,
} from "./requestTypes/order.request.types";
import OrderCreateSchemaValidator from "../models/validators/createValidators/order.create.validator";

class OrderController {
  async getOrder(
    req: GetOrderRequestType,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const {
      params: { id },
    } = req;

    try {
      const order: Order = await orderService.getOrder(id);

      res.status(200).json(order);
    } catch (error) {
      Logger.error(
        `Error in ${__filename} - getOrder method: ${
          (error as HttpException).error_description
        }`
      );
      next(error);
    }
  }

  async getOrders(
    req: GetOrdersRequestType,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { query } = req;

    try {
      const orders: ItemsPage<Order> = await orderService.getOrders(query);

      res.status(200).json(orders);
    } catch (error) {
      Logger.error(
        `Error in ${__filename} - getOrders method: ${
          (error as HttpException).error_description
        }`
      );
      next(error);
    }
  }

  async createOrder(
    req: UpdateOrderRequestType,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const {
      params: { id },
      body,
    } = req;

    try {
      const { value, error } = OrderCreateSchemaValidator.validate(body);

      if (error) {
        throw new ValidationException("Object invalid", error.message);
      }

      const createdOrder: Order = await orderService.createOrder(value);
      Logger.info(`order with id: ${id} created`);

      res.status(200).json(createdOrder);
    } catch (error) {
      Logger.error(
        `Error in ${__filename} - createOrder method: ${
          (error as HttpException).error_description
        }`
      );
      next(error);
    }
  }

  async updateOrder(
    req: UpdateOrderRequestType,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const {
      params: { id },
      body,
    } = req;

    try {
      const { value, error } = OrderUpdateSchemaValidator.validate(body);

      if (error) {
        throw new ValidationException("Object invalid", error.message);
      }

      const updatedOrder: Order = await orderService.updateOrder(id, value);
      Logger.info(`order with id: ${id} updated`);

      res.status(200).json(updatedOrder);
    } catch (error) {
      Logger.error(
        `Error in ${__filename} - updateOrder method: ${
          (error as HttpException).error_description
        }`
      );
      next(error);
    }
  }

  async deleteOrder(
    req: DeleteOrderRequestType,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const {
      params: { id },
    } = req;

    try {
      await orderService.deleteOrder(id);
      Logger.info(`order with id: ${id} deleted`);

      res.status(200).json();
    } catch (error) {
      Logger.error(
        `Error in ${__filename} - deleteOrder method: ${
          (error as HttpException).error_description
        }`
      );
      next(error);
    }
  }
}

const orderController: OrderController = new OrderController();

export default orderController;
