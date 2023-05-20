import prisma from "../config/prisma";
import { CreateTodo, Todo, UpdateTodo } from "../model/todo.model";

export const createTodo = async (todo: CreateTodo): Promise<Todo> => {
  const createdTodo: Todo = await prisma.Todo.create({
    data: todo,
  });
  return createdTodo || undefined;
};

export const getAllTodos = async (): Promise<Todo[]> => {
  const todos: Todo[] = await prisma.Todo.findMany();
  return todos;
};

export const getTodoById = async (todoId: string): Promise<Todo | boolean> => {
  const foundTodo: Todo = await prisma.Todo.findUnique({
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
  const updatedTodo: Todo = await prisma.Todo.update({
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
  await prisma.Todo.delete({
    where: {
      id: todoId,
    },
  });
  return true;
};
