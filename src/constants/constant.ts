export const WinstonLevels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

export enum WinstonColors {
  ERROR = "red",
  WARN = "yellow",
  INFO = "green",
  HTTP = "magenta",
  DEBUG = "white",
}

export enum ModelConstants {
  USER = "users",
  PRODUCT = "products",
  ORDER = "order",
}

export enum ValidatorConstants {
  USER_NAME_MIN = 2,
  USER_NAME_MAX = 30,
}

export enum ValidatorTypes {
  STRING = "string",
  NUMBER = "number",
  ANY = "any",
}

export enum ValidatorKeys {
  BASE = "base",
  EMPTY = "empty",
  EMAIL = "email",
  MIN = "min",
  MAX = "max",
  GREATER = "greater",
  INTEGER = "integer",
  REQUIRED = "required",
  VALID = "valid",
  LENGTH = "length",
  ONLY = "only",
  URI = "uri",
}

export enum ValidatorMessages {
  BASE = "should be a type of",
  EMPTY = "cannot be empty field",
  EMAIL = "must be in email format",
  MIN = "should have a minimum length of",
  MAX = "should have a maximum length of",
  GREATER = "should be greater than",
  INTEGER = "should be integer",
  REQUIRED = "is a required field",
  VALID = "should have values",
  LENGTH = "should be long",
  URI = "must be a valid URL",
}
