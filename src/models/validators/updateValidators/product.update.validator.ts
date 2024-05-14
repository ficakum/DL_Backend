import Joi from "joi";

import { Product } from "../../product.model";
import { messagesConstructor } from "../messages.validator";

const ProductUpdateSchemaValidator: Joi.ObjectSchema<Product> =
  Joi.object<Product>();

export default ProductUpdateSchemaValidator;
