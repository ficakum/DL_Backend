import mongoose, { Document, Model, Schema } from "mongoose";

import { ModelConstants } from "../constants/constant";

export enum OrderStatus {
  PAID = "Paid",
  UNPAID = "Unpaid",
}

type OrderedProduct = {
  productId: string;
  numberOfProducts: number;
};

export type Order = {
  products: OrderedProduct[];
  status: string;
  owner: string;
  orderPrice: number;
} & Document;

const OrderSchema: Schema<Order> = new Schema<Order>(
  {
    products: {
      type: [
        new Schema<OrderedProduct>(
          { productId: String, numberOfProducts: Number },
          { _id: false, id: false }
        ),
      ],
      default: [],
    },
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
