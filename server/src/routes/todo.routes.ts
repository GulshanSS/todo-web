import express, { Router } from "express";
import {
  createTodohandler,
  deleteTodoByIdHandler,
  getAllTodosHandler,
  getTodoByIdHandler,
  updateTodoByIdHandler,
} from "../controller/todo.controller";

const TodoRouter: Router = express.Router();

TodoRouter.get("/", getAllTodosHandler);
TodoRouter.get("/:todoId", getTodoByIdHandler);
TodoRouter.post("/create", createTodohandler);
TodoRouter.put("/:todoId/update", updateTodoByIdHandler);
TodoRouter.delete("/:todoId/delete", deleteTodoByIdHandler);

export default TodoRouter;
