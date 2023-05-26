import prisma from "../config/prisma";
import { TodoCreateInput, TodoUpdateInput } from "../model/todo.model";

export const createTodo = async (todo: TodoCreateInput) => {
  return await prisma.todo.create({
    data: todo,
  });
};

export const getAllTodos = async (userId: string) => {
  return await prisma.todo.findMany({
    where: {
      userId,
    },
  });
};

export const getTodoById = async (todoId: string, userId: string) => {
  return await prisma.todo.findFirst({
    where: {
      AND: [
        {
          id: todoId,
        },
        {
          userId,
        },
      ],
    },
  });
};

export const updateTodoById = async (
  todoId: string,
  todoData: TodoUpdateInput
) => {
  return await prisma.todo.update({
    where: {
      id: todoId,
    },
    data: todoData,
  });
};

export const deleteTodoById = async (todoId: string) => {
  return await prisma.todo.delete({
    where: {
      id: todoId,
    },
  });
};
