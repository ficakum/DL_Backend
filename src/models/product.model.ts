import mongoose, { Document, Model, Schema } from "mongoose";

import { ModelConstants } from "../constants/constant";

export type Product = {
  type: string;
  imageURL: string;
  code: string;
  price: number;
  currency: string;
} & Document;

const ProductSchema: Schema<Product> = new Schema<Product>(
  {
    type: String,
    imageURL: String,
    code: { type: String, unique: true },
    price: Number,
    currency: String,
  },
  {
    timestamps: true,
  }
);

const ProductModel: Model<Product> = mongoose.model<Product>(
  ModelConstants.PRODUCT,
  ProductSchema
);

export default ProductModel;
