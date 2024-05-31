import * as tf from "@tensorflow/tfjs-node";
import mongoose, { Document, Model, Schema } from "mongoose";

import { ModelConstants } from "../constants/constant";

export type Image = {
  featureVector: tf.Tensor<tf.Rank>;
  product: string;
} & Document;

const ImageSchema: Schema<Image> = new Schema<Image>(
  {
    featureVector: { type: tf.Tensor<tf.Rank>, required: true },
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
