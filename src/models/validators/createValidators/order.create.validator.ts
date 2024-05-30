import Joi from "joi";

import { Order } from "../../order.model";
import { messagesConstructor } from "../messages.validator";

const OrderCreateSchemaValidator: Joi.ObjectSchema<Order> = Joi.object<Order>();

export default OrderCreateSchemaValidator;
