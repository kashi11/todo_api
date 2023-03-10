import PaginationData from "../../../InfraStructure/Utils/PaginationData";
import PaginationOptions from "../../../InfraStructure/Utils/PaginationOptions";
import TodoEntity from "../TodoEntity/TodoEntity";

export default interface ITodoRepository {
  fetchAllTodosbyUserId(
    userId: string,
    paginationOptions: PaginationOptions
  ): Promise<PaginationData>;
  addTodo(todoObj: TodoEntity): Promise<TodoEntity>;
  deleteTodo(todoId: string): Promise<TodoEntity>;
}
