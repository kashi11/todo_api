import ITodoRepository from "../../../Domain/Entities/TodoEntity/ITodoRepository";
import { DbDrivers } from "../../Utils/Constants";
import TodoRepositoryMongo from "../Mongoose/TodoRepositoryMongo";
import TodoRepositoryMySQl from "../MySql/TodoRepositoryMySql";

export default class AbstractTodoRepositoryFactory {
  static createRepository = (dbDriver: string): ITodoRepository => {
    switch (dbDriver) {
      case DbDrivers.MONGOOSE:
        return new TodoRepositoryMongo();
      case DbDrivers.SEQUELIZE:
        return new TodoRepositoryMySQl();
      default:
        throw new Error("Invalid db driver");
    }
  };
}
