import PaginationData from "../../InfraStructure/Utils/PaginationData";
import ITodoRepository from "../../Domain/Entities/TodoEntity/ITodoRepository";
import HttpResp from "../../../HTTP/utils/HttpResponse";
import AddTodoDTO from "./AddTodoDTO";
import GetAllTodoDTO from "./GetAllTodosDTO";
import HttpStatusCode from "../Utils/HttpStatusCode";

export default class TodoService {
  constructor(private readonly todoRepository: ITodoRepository) {}

  async addTodo(todoDTO: AddTodoDTO): Promise<HttpResp> {
    try {
      await this.todoRepository.addTodo(todoDTO.todo);
      return HttpResp.create(HttpStatusCode.OK, {
        message: "Todo created successfully",
      });
    } catch (error: any) {
      return HttpResp.create(error.status, { status: "error", message: error.message });
    }
  }
  async getAllTodosByUserId(getAllTodosDTO: GetAllTodoDTO): Promise<HttpResp> {
    const { userId, paginationOptions } = getAllTodosDTO;
    try {
      const paginationDataForTodos: PaginationData = await this.todoRepository.fetchAllTodosbyUserId(
        userId,
        paginationOptions
      );
      return HttpResp.create(HttpStatusCode.OK, paginationDataForTodos.getPaginatedData());
    } catch (error: any) {
      return HttpResp.create(error.status, { status: "error", message: error.message });
    }
  }

  async deleteTodo(todoId: string) {
    try {
      await this.todoRepository.deleteTodo(todoId);
      return HttpResp.create(HttpStatusCode.OK, {
        message: "Todo deleted successfully",
      });
    } catch (error: any) {
      return HttpResp.create(error.status, { status: "error", message: error.message });
    }
  }
}
