import { Request } from "express";

import { Product } from "../../models/product.model";

type GetProductRequestType = Request<{ id: string }, object, object, object>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GetProductsRequestType = Request<object, object, object, Map<string, any>>;
type UpdateProductRequestType = Request<
  { id: string },
  object,
  Partial<Product>,
  object
>;
type DeleteProductRequestType = Request<{ id: string }, object, object, object>;

export type {
  GetProductRequestType,
  GetProductsRequestType,
  UpdateProductRequestType,
  DeleteProductRequestType,
};
