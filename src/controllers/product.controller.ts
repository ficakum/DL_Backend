import { NextFunction, Response } from "express";

import Logger from "../utils/winston.logger";
import HttpException from "../exceptions/http.exception";
import { Product } from "../models/product.model";
import productService from "../services/product.service";
import { ItemsPage } from "../utils/types";
import ProductUpdateSchemaValidator from "../models/validators/updateValidators/product.update.validator";
import ValidationException from "../exceptions/validation.exception";
import {
  DeleteProductRequestType,
  GetProductRequestType,
  GetProductsRequestType,
  UpdateProductRequestType,
} from "./requestTypes/product.request.types";
import ProductCreateSchemaValidator from "../models/validators/createValidators/product.create.validator";

class ProductController {
  async getProduct(
    req: GetProductRequestType,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const {
      params: { id },
    } = req;

    try {
      const product: Product = await productService.getProduct(id);

      res.status(200).json(product);
    } catch (error) {
      Logger.error(
        `Error in ${__filename} - getProduct method: ${
          (error as HttpException).error_description
        }`
      );
      next(error);
    }
  }

  async getProducts(
    req: GetProductsRequestType,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { query } = req;

    try {
      const products: ItemsPage<Product> = await productService.getProducts(
        query
      );

      res.status(200).json(products);
    } catch (error) {
      Logger.error(
        `Error in ${__filename} - getProducts method: ${
          (error as HttpException).error_description
        }`
      );
      next(error);
    }
  }

  async createProduct(
    req: UpdateProductRequestType,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const {
      params: { id },
      body,
    } = req;

    try {
      const { value, error } = ProductCreateSchemaValidator.validate(body);

      if (error) {
        throw new ValidationException("Object invalid", error.message);
      }

      const createdProduct: Product = await productService.createProduct(value);
      Logger.info(`product with id: ${id} created`);

      res.status(200).json(createdProduct);
    } catch (error) {
      Logger.error(
        `Error in ${__filename} - createProduct method: ${
          (error as HttpException).error_description
        }`
      );
      next(error);
    }
  }

  async updateProduct(
    req: UpdateProductRequestType,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const {
      params: { id },
      body,
    } = req;

    try {
      const { value, error } = ProductUpdateSchemaValidator.validate(body);

      if (error) {
        throw new ValidationException("Object invalid", error.message);
      }

      const updatedProduct: Product = await productService.updateProduct(
        id,
        value
      );
      Logger.info(`product with id: ${id} updated`);

      res.status(200).json(updatedProduct);
    } catch (error) {
      Logger.error(
        `Error in ${__filename} - updateProduct method: ${
          (error as HttpException).error_description
        }`
      );
      next(error);
    }
  }

  async deleteProduct(
    req: DeleteProductRequestType,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const {
      params: { id },
    } = req;

    try {
      await productService.deleteProduct(id);
      Logger.info(`product with id: ${id} deleted`);

      res.status(200).json();
    } catch (error) {
      Logger.error(
        `Error in ${__filename} - deleteProduct method: ${
          (error as HttpException).error_description
        }`
      );
      next(error);
    }
  }
}

const productController: ProductController = new ProductController();

export default productController;
