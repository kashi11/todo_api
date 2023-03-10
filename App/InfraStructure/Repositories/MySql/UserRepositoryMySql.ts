import IUserRepository from "../../../Domain/Entities/IRepositories/IUserRepository";
import UserEntity from "../../../Domain/Entities/UserEntity/UserEntity";
import { AlreadyExistsError, NotFoundError } from "../../../Domain/Exception";
import sequelizeDb from "../../Database/Sequelize/models";

export default class UserRepositoryMySql implements IUserRepository {
  async fetchByEmail(email: string): Promise<UserEntity> {
    const user = await sequelizeDb.User.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return UserEntity.createFromDatabase(user);
  }

  async userAlreadyExists(email: string): Promise<void> {
    const user = await await sequelizeDb.User.findOne({ where: { email } });
    if (!user) throw new AlreadyExistsError('User already exist.')
  }

  async createUser(user: UserEntity): Promise<Boolean> {
    const createdUser = await sequelizeDb.User.create(user);
    return true;
  }
}
