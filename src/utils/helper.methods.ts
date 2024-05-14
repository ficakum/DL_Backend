import bcrypt from "bcrypt";

import config from "../configs/env.config";

async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, config.PASSWORD_HASH_ROUNDS);
}

export { hashPassword };
