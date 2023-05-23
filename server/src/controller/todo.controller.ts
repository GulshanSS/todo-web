import { Response, Request } from "express";
import logger from "../config/logger";
import { CreateTodo, Todo, UpdateTodo } from "../model/todo.model";
import {
  createTodo,
  deleteTodoById,
  getAllTodos,
  getTodoById,
  updateTodoById,
} from "../services/todo.service";

export const getAllTodosHandler = async (
  req: Request,
  res: Response
): Promise<Response | undefined> => {
  try {
    const todos: Todo[] = await getAllTodos();
    return res.status(200).json({
      success: true,
      todos,
    });
  } catch (e: unknown) {
    if (e instanceof Error) logger.error(e.message);
  }
};

export const getTodoByIdHandler = async (
  req: Request,
  res: Response
): Promise<Response | undefined> => {
  try {
    const todoId: string = req.params.todoId;
    const foundTodo: Todo | boolean = await getTodoById(todoId);
    if (!foundTodo) {
      return res.status(404).json({
        success: false,
        message: "Todo Not Found",
      });
    }
    return res.status(200).json({
      success: true,
      todo: foundTodo,
    });
  } catch (e: unknown) {
    if (e instanceof Error) logger.error(e.message);
  }
};

export const createTodohandler = async (
  req: Request,
  res: Response
): Promise<Response | undefined> => {
  try {
    const todo: CreateTodo = req.body;
    const createdTodo = await createTodo(todo);
    return res.status(201).json({
      success: true,
      todo: createdTodo,
    });
  } catch (e: unknown) {
    if (e instanceof Error) logger.error(e.message);
  }
};

export const updateTodoByIdHandler = async (
  req: Request,
  res: Response
): Promise<Response | undefined> => {
  try {
    const todoId: string = req.params.todoId;
    const todoData: UpdateTodo = req.body;
    const updatedTodo: Todo | boolean = await updateTodoById(todoId, todoData);
    if (!updatedTodo) {
      return res.status(404).json({
        success: false,
        message: "Todo Not Found",
      });
    }
    return res.status(201).json({
      success: true,
      todo: updatedTodo,
    });
  } catch (e: unknown) {
    if (e instanceof Error) logger.error(e.message);
  }
};

export const deleteTodoByIdHandler = async (
  req: Request,
  res: Response
): Promise<Response | undefined> => {
  try {
    const todoId = req.params.todoId;
    const deletedTodo: boolean = await deleteTodoById(todoId);
    if (!deletedTodo) {
      return res.status(404).json({
        success: false,
        message: "Todo Not Found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Todo Deleted Successfully",
    });
  } catch (e: unknown) {
    if (e instanceof Error) logger.error(e.message);
  }
};
