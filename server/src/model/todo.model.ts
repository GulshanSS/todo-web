import { User } from "./user.model";

export interface Todo {
  id: string;
  task: string;
  status: string;
  userId: string;
  owner: User;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateTodo = Omit<Todo, "id" | "createdAt" | "updatedAt">;

export type UpdateTodo = Partial<Todo>;
