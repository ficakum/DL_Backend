import mongoose, { Document, Model, Schema } from "mongoose";

import { ModelConstants } from "../constants/constant";

export type Image = {
  featureVector: number[];
  product: string;
} & Document;

const ImageSchema: Schema<Image> = new Schema<Image>(
  {
    featureVector: { type: [Number], required: true },
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
