import Joi from "joi";

import { Product } from "../../product.model";
import { messagesConstructor } from "../messages.validator";
import {
  ValidatorKeys,
  ValidatorMessages,
  ValidatorTypes,
} from "../../../constants/constant";

const ProductCreateSchemaValidator: Joi.ObjectSchema<Product> =
  Joi.object<Product>({
    type: Joi.string()
      .required()
      .messages(
        messagesConstructor(
          ValidatorTypes.STRING,
          {
            [ValidatorKeys.BASE]: `${ValidatorMessages.BASE} ${ValidatorTypes.STRING}`,
            [ValidatorKeys.EMPTY]: ValidatorMessages.EMPTY,
            [ValidatorKeys.REQUIRED]: ValidatorMessages.REQUIRED,
          },
          "type"
        )
      ),
    imageURL: Joi.string()
      .uri()
      .messages(
        messagesConstructor(
          ValidatorTypes.STRING,
          {
            [ValidatorKeys.BASE]: `${ValidatorMessages.BASE} ${ValidatorTypes.STRING}`,
            [ValidatorKeys.EMPTY]: ValidatorMessages.EMPTY,
            [ValidatorKeys.URI]: ValidatorMessages.URI,
          },
          "imageURL"
        )
      ),
    code: Joi.string()
      .required()
      .messages(
        messagesConstructor(
          ValidatorTypes.STRING,
          {
            [ValidatorKeys.BASE]: `${ValidatorMessages.BASE} ${ValidatorTypes.STRING}`,
            [ValidatorKeys.EMPTY]: ValidatorMessages.EMPTY,
            [ValidatorKeys.REQUIRED]: ValidatorMessages.REQUIRED,
          },
          "code"
        )
      ),
    price: Joi.number()
      .required()
      .messages(
        messagesConstructor(
          ValidatorTypes.NUMBER,
          {
            [ValidatorKeys.BASE]: `${ValidatorMessages.BASE} ${ValidatorTypes.NUMBER}`,
            [ValidatorKeys.REQUIRED]: ValidatorMessages.REQUIRED,
          },
          "price"
        )
      ),
    currency: Joi.string()
      .required()
      .messages(
        messagesConstructor(
          ValidatorTypes.STRING,
          {
            [ValidatorKeys.BASE]: `${ValidatorMessages.BASE} ${ValidatorTypes.STRING}`,
            [ValidatorKeys.EMPTY]: ValidatorMessages.EMPTY,
            [ValidatorKeys.REQUIRED]: ValidatorMessages.REQUIRED,
          },
          "currency"
        )
      ),
  });

export default ProductCreateSchemaValidator;
