import mongoose, { Document, Model, Schema } from "mongoose";

import { ModelConstants } from "../constants/constant";

export type Product = {
  type: string;
  name: string;
  imageURL: string;
  code: string; //name
  price: number;
} & Document;

const ProductSchema: Schema<Product> = new Schema<Product>(
  {
    type: String,
    name: String,
    imageURL: String,
    code: { type: String, unique: true },
    price: Number,
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
