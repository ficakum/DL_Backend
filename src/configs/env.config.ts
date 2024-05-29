import * as dotenv from "dotenv";

import Logger from "../utils/winston.logger";

dotenv.config();

type IConfig = {
  MONGODB_CONNECTION: string;
  MONGODB_NAME: string;
  JWT_SECRET: string;
  JWT_EXPIRATION_TIME: number;
  JWT_REFRESH_TOKEN_EXPIRATION: number;
  PASSWORD_HASH_ROUNDS: number;
};

if (
  !process.env.MONGODB_CONNECTION ||
  !process.env.MONGODB_NAME ||
  !process.env.JWT_SECRET ||
  !process.env.JWT_EXPIRATION_TIME ||
  !process.env.JWT_REFRESH_TOKEN_EXPIRATION ||
  !process.env.PASSWORD_HASH_ROUNDS
) {
  Logger.error("Environment variables missing");

  process.exit(1);
}

const config: IConfig = {
  MONGODB_CONNECTION: process.env.MONGODB_CONNECTION,
  MONGODB_NAME: process.env.MONGODB_NAME,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRATION_TIME: Number(process.env.JWT_EXPIRATION_TIME),
  JWT_REFRESH_TOKEN_EXPIRATION: Number(
    process.env.JWT_REFRESH_TOKEN_EXPIRATION
  ),
  PASSWORD_HASH_ROUNDS: Number(process.env.PASSWORD_HASH_ROUNDS),
};

export default config;
