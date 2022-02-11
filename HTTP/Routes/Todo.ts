import express from "express";
import TodoController from "../Controllers/TodoController";
import auth from "../Middleware/Auth";
import AbstractTodoRepositoryFactory from "../../App/InfraStructure/Repositories/AbstractRepositoryFactories/AbstractTodoRepositoryFactory";
import Config from "../../App/InfraStructure/Config";
import TodoService from "../../App/Application/Todo/TodoService";

const router = express.Router();

const todoRepository = AbstractTodoRepositoryFactory.createRepository(Config.Server.DB_DRIVER ?? "");
const todoService = new TodoService(todoRepository);
const todoController = new TodoController(todoService);

router.get("/", auth, todoController.getAllTodos);
router.post("/", auth, todoController.addTodo);
router.delete("/:todoId", auth, todoController.deleteTodo);

export default router;
