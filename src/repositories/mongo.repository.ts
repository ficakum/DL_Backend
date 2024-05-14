import mongoose, { Model, Document } from "mongoose";

import { ItemsPage } from "../utils/types";

export default class Repository<E extends Document> {
  model: Model<E>;

  constructor(model: Model<E>) {
    this.model = model;
  }
}
