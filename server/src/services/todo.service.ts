import prisma from "../config/prisma";
import { CreateTodo, Todo, UpdateTodo } from "../model/todo.model";

export const createTodo = async (todo: CreateTodo): Promise<Todo> => {
  const createdTodo: Todo = await prisma.todo.create({
    data: todo,
  });
  return createdTodo;
};

export const getAllTodos = async (): Promise<Todo[]> => {
  const todos: Todo[] = await prisma.todo.findMany();
  return todos;
};

export const getTodoById = async (todoId: string): Promise<Todo | boolean> => {
  const foundTodo: Todo | null = await prisma.todo.findUnique({
    where: {
      id: todoId,
    },
  });
  if (!foundTodo) {
    return false;
  }
  return foundTodo;
};

export const updateTodoById = async (
  todoId: string,
  todoData: UpdateTodo
): Promise<Todo | boolean> => {
  const oldTodo: Todo | boolean = await getTodoById(todoId);
  if (!oldTodo) {
    return false;
  }
  const updatedTodo: Todo = await prisma.todo.update({
    where: {
      id: todoId,
    },
    data: todoData,
  });
  return updatedTodo;
};

export const deleteTodoById = async (todoId: string): Promise<boolean> => {
  const todo: Todo | boolean = await getTodoById(todoId);
  if (!todo) {
    return false;
  }
  await prisma.todo.delete({
    where: {
      id: todoId,
    },
  });
  return true;
};
