import TodoEntity from "../../Domain/Entities/TodoEntity/TodoEntity";
import { generateId } from "../../InfraStructure/Utils/GenerateUuid";
export default class AddTodoDTO {
  public todo: TodoEntity;

  constructor(request: any) {
    const params = request.body;
    this.todo = TodoEntity.createFromInput(params);
    this.todo.todoId = generateId();
    this.todo.userId = request.user.userId;
  }
}
