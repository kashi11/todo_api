import ITodoRepository from "../../../Domain/Entities/IRepositories/ITodoRepository";
import TodoEntity from "../../../Domain/Entities/TodoEntity/TodoEntity";
import sequelizeDb from "../../Database/Sequelize/models";
import PaginationData from "../../Utils/PaginationData";
import PaginationOptions from "../../Utils/PaginationOptions";


export default class TodoRepositoryMySQl implements ITodoRepository {
  async fetchAllTodosbyUserId(
    userId: string,
    paginationOptions: PaginationOptions
  ): Promise<PaginationData> {
    const { rows, count } = await sequelizeDb.Todo.findAndCountAll({
      where: { userId, isDeleted: false },
      limit: paginationOptions.limit(),
      offset: paginationOptions.offset(),
      order: [["createdAt", "DESC"]],
    });

    const transformedTodos = rows.map((todo: any) => {
      return TodoEntity.createFromDatabase(todo);
    });
    const paginationData = new PaginationData({
      items: transformedTodos,
      paginationOptions,
      count,
    });
    return paginationData;
  }
  async addTodo(todoObj: any): Promise<TodoEntity> {
    const todo = await sequelizeDb.Todo.create(todoObj);
    return TodoEntity.createFromDatabase(todo);
  }
  async deleteTodo(todoId: string): Promise<TodoEntity> {
    const todo = await sequelizeDb.Todo.update(
      { isDeleted: true },
      { where: { todoId: todoId } }
    );
    return TodoEntity.createFromDatabase(todo);
  }
}
