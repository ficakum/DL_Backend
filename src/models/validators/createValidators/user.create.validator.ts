import Joi from "joi";

import { Roles, User } from "../../user.model";
import { messagesConstructor } from "../messages.validator";
import {
  ValidatorConstants,
  ValidatorKeys,
  ValidatorMessages,
  ValidatorTypes,
} from "constants/constant";

const UserCreateSchemaValidator: Joi.ObjectSchema<User> = Joi.object<User>({
  userName: Joi.string()
    .min(ValidatorConstants.USER_NAME_MIN)
    .max(ValidatorConstants.USER_NAME_MAX)
    .required()
    .messages(
      messagesConstructor(
        ValidatorTypes.STRING,
        {
          [ValidatorKeys.BASE]: `${ValidatorMessages.BASE} ${ValidatorTypes.STRING}`,
          [ValidatorKeys.EMPTY]: ValidatorMessages.EMPTY,
          [ValidatorKeys.MIN]: `${ValidatorMessages.MIN} ${ValidatorConstants.USER_NAME_MIN}`,
          [ValidatorKeys.MAX]: `${ValidatorMessages.MAX} ${ValidatorConstants.USER_NAME_MAX}`,
          [ValidatorKeys.REQUIRED]: ValidatorMessages.REQUIRED,
        },
        "userName"
      )
    ),
  email: Joi.string()
    .email()
    .required()
    .messages(
      messagesConstructor(
        ValidatorTypes.STRING,
        {
          [ValidatorKeys.BASE]: `${ValidatorMessages.BASE} ${ValidatorTypes.STRING}`,
          [ValidatorKeys.EMPTY]: ValidatorMessages.EMPTY,
          [ValidatorKeys.EMAIL]: ValidatorMessages.EMAIL,
          [ValidatorKeys.REQUIRED]: ValidatorMessages.REQUIRED,
        },
        "email"
      )
    ),
  password: Joi.optional(),
  userType: Joi.string()
    .valid(...Object.values(Roles))
    .messages({
      [`${ValidatorTypes.ANY}.${ValidatorKeys.ONLY}`]:
        "User type must be one of the following values: {{#valids}}",
      ...messagesConstructor(
        ValidatorTypes.STRING,
        {
          [ValidatorKeys.BASE]: `${ValidatorMessages.BASE} ${ValidatorTypes.STRING}`,
        },
        "userType"
      ),
    }),
});

export default UserCreateSchemaValidator;
