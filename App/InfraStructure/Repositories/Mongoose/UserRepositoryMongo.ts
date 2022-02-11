import IUserRepository from "../../../Domain/Entities/UserEntity/IUserRepository";
import UserEntity from "../../../Domain/Entities/UserEntity/UserEntity";
import UserModel from "../../Database/Mongoose/Models/User";

export default class UserRepositoryMongo implements IUserRepository {
  async userAlreadyExists(email: string): Promise<Boolean> {
    const user = await UserModel.findOne({ email });
    return !!user;
  }

  async createUser(user: UserEntity): Promise<Boolean> {
    const createdUser = await UserModel.create(user);
    return true;
  }

  async fetchByEmail(email: string): Promise<UserEntity> {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    return UserEntity.createFromInput(user);
  }
}
