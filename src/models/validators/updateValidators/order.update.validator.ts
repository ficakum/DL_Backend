import Joi from "joi";

import { Order, OrderStatus } from "../../order.model";
import { messagesConstructor } from "../messages.validator";
import {
  ValidatorKeys,
  ValidatorMessages,
  ValidatorTypes,
} from "constants/constant";

const OrderUpdateSchemaValidator: Joi.ObjectSchema<Order> = Joi.object<Order>({
  products: Joi.array()
    .items(
      Joi.string().messages(
        messagesConstructor(
          ValidatorTypes.STRING,
          {
            [ValidatorKeys.BASE]: `${ValidatorMessages.BASE} ${ValidatorTypes.STRING}`,
            [ValidatorKeys.EMPTY]: ValidatorMessages.EMPTY,
            [ValidatorKeys.REQUIRED]: ValidatorMessages.REQUIRED,
          },
          "products.item"
        )
      )
    )
    .min(1)
    .messages(
      messagesConstructor(
        ValidatorTypes.ARRAY,
        {
          [ValidatorKeys.BASE]: `${ValidatorMessages.BASE} ${ValidatorTypes.STRING}`,
          [ValidatorKeys.INCLUDES]: `${ValidatorMessages.INCLUDES} ${ValidatorTypes.STRING}`,
          [ValidatorKeys.MIN]: `${ValidatorMessages.MIN} 1`,
          [ValidatorKeys.ARRAY_UNKNOWNS]: `${ValidatorMessages.ARRAY_UNKNOWNS} ${ValidatorTypes.STRING}`,
        },
        "products"
      )
    ),
  status: Joi.string()
    .valid(...Object.values(OrderStatus))
    .messages({
      [`${ValidatorTypes.ANY}.${ValidatorKeys.ONLY}`]:
        "Order status must be one of the following values: {{#valids}}",
      ...messagesConstructor(
        ValidatorTypes.STRING,
        {
          [ValidatorKeys.BASE]: `${ValidatorMessages.BASE} ${ValidatorTypes.STRING}`,
        },
        "status"
      ),
    }),
  owner: Joi.string().messages(
    messagesConstructor(
      ValidatorTypes.STRING,
      {
        [ValidatorKeys.BASE]: `${ValidatorMessages.BASE} ${ValidatorTypes.STRING}`,
        [ValidatorKeys.EMPTY]: ValidatorMessages.EMPTY,
        [ValidatorKeys.REQUIRED]: ValidatorMessages.REQUIRED,
      },
      "owner"
    )
  ),
  orderPrice: Joi.number().messages(
    messagesConstructor(
      ValidatorTypes.NUMBER,
      {
        [ValidatorKeys.BASE]: `${ValidatorMessages.BASE} ${ValidatorTypes.NUMBER}`,
        [ValidatorKeys.REQUIRED]: ValidatorMessages.REQUIRED,
      },
      "orderPrice"
    )
  ),
});

export default OrderUpdateSchemaValidator;
