import AppError from "../../../Application/Utils/AppError";
import HttpStatusCode from "../../../Application/Utils/HttpStatusCode";
import IUserRepository from "../../../Domain/Entities/UserEntity/IUserRepository";
import UserEntity from "../../../Domain/Entities/UserEntity/UserEntity";
import sequelizeDb from "../../Database/Sequelize/models";

export default class UserRepositoryMySql implements IUserRepository {
  async fetchByEmail(email: string): Promise<UserEntity> {
    const user = await sequelizeDb.User.findOne({ where: { email } });
    if (!user) {
      throw new AppError("User not found", HttpStatusCode.NOT_FOUND);
    }
    return UserEntity.createFromDatabase(user);
  }

  async userAlreadyExists(email: string): Promise<Boolean> {
    const user = await await sequelizeDb.User.findOne({ where: { email } });
    return !!user;
  }

  async createUser(user: UserEntity): Promise<Boolean> {
    const createdUser = await sequelizeDb.User.create(user);
    return true;
  }
}
