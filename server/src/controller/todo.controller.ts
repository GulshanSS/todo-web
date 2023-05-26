import { Response, Request } from "express";
import logger from "../config/logger";
import { TodoCreateInput, Todo, TodoUpdateInput } from "../model/todo.model";
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
    const userId: string = req.payload.userId;
    const todos = (await getAllTodos(userId)) as Todo[];
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
    const userId: string = req.payload.userId;
    const todoId: string = req.params.todoId;
    const foundTodo = (await getTodoById(todoId, userId)) as Todo;
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
    const userId: string = req.payload.userId;
    const todo: TodoCreateInput = { ...req.body, userId };
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
    const userId: string = req.payload.userId;
    const todoId: string = req.params.todoId;
    const oldTodo = (await getTodoById(todoId, userId)) as Todo;
    if (!oldTodo) {
      return res.status(404).json({
        success: false,
        message: "Todo Not Found",
      });
    }
    const todoData: TodoUpdateInput = req.body;
    const updatedTodo = (await updateTodoById(todoId, todoData)) as Todo;
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
    const userId: string = req.payload.userId;
    const todoId = req.params.todoId;
    const todo = (await getTodoById(todoId, userId)) as Todo;
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo Not Found",
      });
    }
    const deletedTodo = (await deleteTodoById(todoId)) as Todo;

    return res.status(200).json({
      success: true,
      message: `Todo Deleted Successfully with id as ${deletedTodo.id}`,
    });
  } catch (e: unknown) {
    if (e instanceof Error) logger.error(e.message);
  }
};
