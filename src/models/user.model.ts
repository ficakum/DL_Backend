import mongoose, { CallbackError, Document, Model, Schema } from "mongoose";

import { ModelConstants } from "../constants/constant";
import { hashPassword } from "../utils/helper.methods";

export enum Roles {
  ADMIN = "admin",
  CUSTOMER = "customer",
  VENDOR = "vendor",
}
export type Role = "admin" | "customer" | "vendor";

export type User = {
  userName: string;
  email: string;
  password: string;
  userType: Role;
} & Document;

const UserSchema: Schema<User> = new Schema<User>(
  {
    userName: { type: String, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, select: false },
    userType: { type: String, enum: Roles, default: Roles.CUSTOMER },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre(
  /save/,
  async function (next: (err?: CallbackError | undefined) => void) {
    const user: User = this as unknown as User;
    if (!user.password) return next();

    try {
      user.password = await hashPassword(user.password);

      return next();
    } catch (error) {
      return next(error as CallbackError);
    }
  }
);

UserSchema.pre(
  "findOneAndUpdate",
  async function (next: (err?: CallbackError | undefined) => void) {
    const user: User | null = this.getUpdate() as unknown as User;
    if (!user || !user.password) return next();

    try {
      user.password = await hashPassword(user.password);

      return next();
    } catch (error) {
      return next(error as CallbackError);
    }
  }
);

const UserModel: Model<User> = mongoose.model<User>(
  ModelConstants.USER,
  UserSchema
);

export default UserModel;
