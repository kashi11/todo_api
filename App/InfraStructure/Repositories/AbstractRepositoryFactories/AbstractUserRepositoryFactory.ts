import IUserRepository from "../../../Domain/Entities/UserEntity/IUserRepository";
import { DbDrivers } from "../../Utils/Constants";
import UserRepositoryMongo from "../Mongoose/UserRepositoryMongo";
import UserRepositoryMySql from "../MySql/UserRepositoryMySql";

export default class AbstractUserRepositoryFactory {
  static createRepository = (dbDriver: string): IUserRepository => {
    switch (dbDriver) {
      case DbDrivers.MONGOOSE:
        return new UserRepositoryMongo();
      case DbDrivers.SEQUELIZE:
        return new UserRepositoryMySql();
      default:
        throw new Error("Invalid db driver");
    }
  };
}
