import Joi from "joi";

import { Order, OrderStatus } from "../../order.model";
import { messagesConstructor } from "../messages.validator";
import {
  ValidatorKeys,
  ValidatorMessages,
  ValidatorTypes,
} from "../../../constants/constant";

const OrderCreateSchemaValidator: Joi.ObjectSchema<Order> = Joi.object<Order>({
  products: Joi.array()
    .min(1)
    .messages(
      messagesConstructor(
        ValidatorTypes.ARRAY,
        {
          [ValidatorKeys.BASE]: `${ValidatorMessages.BASE} ${ValidatorTypes.STRING}`,
          [ValidatorKeys.MIN]: `${ValidatorMessages.MIN} 1`,
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
  owner: Joi.string()
    .required()
    .messages(
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
  orderPrice: Joi.number()
    .required()
    .messages(
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

export default OrderCreateSchemaValidator;
