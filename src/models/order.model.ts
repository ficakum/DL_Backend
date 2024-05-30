import mongoose, { Document, Model, Schema } from "mongoose";

import { ModelConstants } from "../constants/constant";

export enum OrderStatus {
  PAID = "Paid",
  UNPAID = "Unpaid",
}

export type Order = {
  products: string[];
  status: string;
  owner: string;
  orderPrice: number;
} & Document;

const OrderSchema: Schema<Order> = new Schema<Order>(
  {
    products: { type: [String], default: [] },
    status: { type: String, enum: OrderStatus, default: OrderStatus.UNPAID },
    owner: String,
    orderPrice: Number,
  },
  {
    timestamps: true,
  }
);

const OrderModel: Model<Order> = mongoose.model<Order>(
  ModelConstants.ORDER,
  OrderSchema
);

export default OrderModel;
