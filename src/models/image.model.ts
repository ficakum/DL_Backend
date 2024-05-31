import * as tf from "@tensorflow/tfjs-node";
import mongoose, { Document, Model, Schema } from "mongoose";

import { ModelConstants } from "../constants/constant";

export type Image = {
  featureVector: number[];
  shape: number[];
  product: string;
} & Document;

const ImageSchema: Schema<Image> = new Schema<Image>(
  {
    featureVector: { type: [Number], required: true },
    shape: { type: [Number], required: true },
    product: { type: String, unique: true },
  },
  {
    timestamps: true,
  }
);

const ImageModel: Model<Image> = mongoose.model<Image>(
  ModelConstants.IMAGE,
  ImageSchema
);

export default ImageModel;
