import Joi from "joi";

import { Product } from "../../product.model";
import { messagesConstructor } from "../messages.validator";
import {
  ValidatorKeys,
  ValidatorMessages,
  ValidatorTypes,
} from "../../../constants/constant";

const ProductUpdateSchemaValidator: Joi.ObjectSchema<Product> =
  Joi.object<Product>({
    type: Joi.string().messages(
      messagesConstructor(
        ValidatorTypes.STRING,
        {
          [ValidatorKeys.BASE]: `${ValidatorMessages.BASE} ${ValidatorTypes.STRING}`,
          [ValidatorKeys.EMPTY]: ValidatorMessages.EMPTY,
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
    code: Joi.string().messages(
      messagesConstructor(
        ValidatorTypes.STRING,
        {
          [ValidatorKeys.BASE]: `${ValidatorMessages.BASE} ${ValidatorTypes.STRING}`,
          [ValidatorKeys.EMPTY]: ValidatorMessages.EMPTY,
        },
        "code"
      )
    ),
    price: Joi.number().messages(
      messagesConstructor(
        ValidatorTypes.NUMBER,
        {
          [ValidatorKeys.BASE]: `${ValidatorMessages.BASE} ${ValidatorTypes.NUMBER}`,
        },
        "price"
      )
    ),
    name: Joi.string().messages(
      messagesConstructor(
        ValidatorTypes.STRING,
        {
          [ValidatorKeys.BASE]: `${ValidatorMessages.BASE} ${ValidatorTypes.STRING}`,
          [ValidatorKeys.EMPTY]: ValidatorMessages.EMPTY,
        },
        "name"
      )
    ),
  });

export default ProductUpdateSchemaValidator;
