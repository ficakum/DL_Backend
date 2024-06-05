import bcrypt from "bcrypt";

import BadRequestException from "../exceptions/badRequest.exception";
import ValidationException from "../exceptions/validation.exception";
import UserModel, { User } from "../models/user.model";
import Repository from "../repositories/mongo.repository";
import { ItemsPage } from "../utils/types";

class UserService {
  repository: Repository<User>;

  constructor() {
    this.repository = new Repository<User>(UserModel);
  }

  async getUser(id: string, properties: string = ""): Promise<User> {
    return this.repository.getItem(id, properties);
  }

  async getUserByProperties(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    searchQuery: Record<string, any>,
    select: string = ""
  ): Promise<User> {
    return this.repository.getItemBySpecificProperties(searchQuery, select);
  }

  async getUserByPropertiesWithPassword(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    searchQuery: Record<string, any>
  ): Promise<User> {
    return this.getUserByProperties(searchQuery, "+password");
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async getUsers(query: Map<string, any>): Promise<ItemsPage<User>> {
    return this.repository.getItems(query);
  }

  async createUser(user: Partial<User>): Promise<User> {
    let createdUser: User;

    try {
      createdUser = await this.repository.createItem(user);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userWithoutPassword } = createdUser.toObject();

      return userWithoutPassword;
    } catch (error) {
      const message: string = JSON.stringify(error).includes("email")
        ? "email already exists"
        : JSON.stringify(error).includes("email")
        ? "userName already exists"
        : "Invalid password";
      throw new ValidationException("Object invalid", message);
    }
  }

  async updateUser(id: string, user: Partial<User>): Promise<User> {
    try {
      const updatedUser: User = await this.repository.updateItem(id, user);
      return updatedUser;
    } catch (error) {
      const message: string = JSON.stringify(error).includes("email")
        ? "email already exists"
        : "userName already exists";
      throw new ValidationException("Object invalid", message);
    }
  }

  async deleteUser(id: string): Promise<void> {
    await this.repository.deleteItem(id);
  }

  async getPassword(id: string): Promise<string> {
    const { password } = await this.getUser(id, "password -_id");

    return password;
  }

  async changePassword(
    id: string,
    newPassword: string,
    oldPassword: string
  ): Promise<User> {
    const password = await this.getPassword(id);

    await this.checkOldPassword(oldPassword, password);

    return await this.updateUser(id, { password: newPassword });
  }

  private async checkOldPassword(
    oldPassword: string,
    hashedPassword: string
  ): Promise<void> {
    const isPasswordCorrect: boolean = await bcrypt.compare(
      oldPassword,
      hashedPassword
    );

    if (!isPasswordCorrect) {
      throw new BadRequestException("Bad Request", "Old password invalid");
    }
  }
}

const userService: UserService = new UserService();

export default userService;
