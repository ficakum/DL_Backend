import mongoose, { CallbackError, Document, Model, Schema } from "mongoose";

import { ModelConstants } from "../constants/constant";

export type Product = { type: string } & Document;

const ProductSchema: Schema<Product> = new Schema<Product>(
  {
    type: String,
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
