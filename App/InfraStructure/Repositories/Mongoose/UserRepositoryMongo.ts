import IUserRepository from "../../../Domain/Entities/IRepositories/IUserRepository";
import UserEntity from "../../../Domain/Entities/UserEntity/UserEntity";
import { AlreadyExistsError, NotFoundError } from "../../../Domain/Exception";
import UserModel from "../../Database/Mongoose/Models/User";

export default class UserRepositoryMongo implements IUserRepository {
  async userAlreadyExists(email: string): Promise<void> {
    const user = await UserModel.findOne({ email });
    if (!user) throw new AlreadyExistsError('User already exist.')
  }

  async createUser(user: UserEntity): Promise<Boolean> {
    const createdUser = await UserModel.create(user);
    return true;
  }

  async fetchByEmail(email: string): Promise<UserEntity> {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new NotFoundError("User not found");
    }
    return UserEntity.createFromInput(user);
  }
}
