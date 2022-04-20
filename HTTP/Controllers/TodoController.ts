import AddTodoDTO from "../../App/Application/Todo/AddTodoDTO";
import GetAllTodoDTO from "../../App/Application/Todo/GetAllTodosDTO";
import TodoService from "../../App/Application/Todo/TodoService";
import HttpResp from "../utils/HttpResponse";
class TodoController {
  constructor(private readonly todoService: TodoService) {}

  getAllTodos = async (req: any, res: any) => {
    const getAllTodosDTO = new GetAllTodoDTO(req);
    const httpResp = await this.todoService.getAllTodosByUserId(getAllTodosDTO);
    return HttpResp.convertToExpress(res, httpResp);
  };

  addTodo = async (req: any, res: any) => {
    const addTodoDTO = new AddTodoDTO(req);
    const httpResp = await this.todoService.addTodo(addTodoDTO);
    return HttpResp.convertToExpress(res, httpResp);
  };

  deleteTodo = async (req: any, res: any) => {
    const { todoId } = req.query;
    const httpResp = await this.todoService.deleteTodo(todoId);
    return HttpResp.convertToExpress(res, httpResp);
  };
}
export default TodoController;
