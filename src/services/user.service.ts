import UserModel, { User } from "models/user.model";

class UserService {
  async getUser(_id: string) {
    const user: User = new UserModel({ email: "", userName: "", password: "" });
    return user;
  }
}

const userService: UserService = new UserService();

export default userService;
