import { Request } from "express";

import { Order } from "../../models/order.model";

type GetOrderRequestType = Request<{ id: string }, object, object, object>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GetOrdersRequestType = Request<object, object, object, Map<string, any>>;
type UpdateOrderRequestType = Request<
  { id: string },
  object,
  Partial<Order>,
  object
>;
type DeleteOrderRequestType = Request<{ id: string }, object, object, object>;

export type {
  GetOrderRequestType,
  GetOrdersRequestType,
  UpdateOrderRequestType,
  DeleteOrderRequestType,
};
