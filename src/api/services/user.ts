import { UserModel } from "../model/users/user.model";
import { IUser } from "../model/users/user.types";

class UserService {
  async createUser(user: IUser): Promise<void> {
    try {
        await UserModel.create(user)
    } catch (error) {
        throw error
    }
  }

  async findUser( email: string) {
    try {
        return UserModel.findOne({ email: email })
    } catch (error) {
        throw error
    }
  }
}

export default new UserService()