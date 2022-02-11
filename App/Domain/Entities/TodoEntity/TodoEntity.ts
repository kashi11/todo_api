export default class TodoEntity {
  public todo: string;
  public todoId: string;
  public userId: string;

  constructor(todo: string, todoId: string, userId: string) {
    this.todo = todo;
    this.todoId = todoId;
    this.userId = userId;
  }

  static createFromInput(todoObj: any): TodoEntity {
    const todo = new TodoEntity(todoObj.todo, todoObj.todoId, todoObj.userId);
    return todo;
  }

  static createFromDatabase(todoObj: any): TodoEntity {
    const todo = new TodoEntity(todoObj.todo, todoObj.todoId, todoObj.userId);
    return todo;
  }

  setTodoId(todoId: string): void {
    this.todoId = todoId;
  }

  setUserId(userId: string): void {
    this.userId = userId;
  }
}
