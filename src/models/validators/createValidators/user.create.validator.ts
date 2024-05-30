import Joi from "joi";

import { User } from "../../user.model";
import { messagesConstructor } from "../messages.validator";

const UserCreateSchemaValidator: Joi.ObjectSchema<User> = Joi.object<User>();

export default UserCreateSchemaValidator;