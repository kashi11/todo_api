import ITodoRepository from "../../../Domain/Entities/TodoEntity/ITodoRepository";
import TodoEntity from "../../../Domain/Entities/TodoEntity/TodoEntity";
import TodoModel from "../../Database/Mongoose/Models/Todo";
import PaginationData from "../../Utils/PaginationData";
import PaginationOptions from "../../Utils/PaginationOptions";

export default class TodoRepositoryMongo implements ITodoRepository {
  async fetchAllTodosbyUserId(
    userId: string,
    paginationOptions: PaginationOptions
  ): Promise<PaginationData> {
    const todos = await TodoModel.find({ userId: userId, isDeleted: false })
      .skip(paginationOptions.offset())
      .limit(paginationOptions.limit());
    const count = await TodoModel.countDocuments({
      userId: userId,
      isDeleted: false,
    });
    const transformedTodos = todos.map((todo: any) => {
      return TodoEntity.createFromDatabase(todo);
    });
    const paginationData = new PaginationData({
      items: transformedTodos,
      paginationOptions,
      count,
    });
    return paginationData;
  }

  async addTodo(todoEntity: TodoEntity): Promise<TodoEntity> {
    const todo = await TodoModel.create(todoEntity);
    return TodoEntity.createFromDatabase(todo);
  }

  async deleteTodo(todoId: string): Promise<TodoEntity> {
    const todo = TodoModel.updateOne({ todoId: todoId }, { isDeleted: true });
    return TodoEntity.createFromDatabase(todo);
  }
}
