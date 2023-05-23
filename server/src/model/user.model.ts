import { Todo } from "./todo.model";

export interface User {
  id: string;
  email: string;
  password: string;
  todos: Todo[];
  createdAt: Date;
  updatedAt: Date;
}

export type CreateUser = Omit<User, "id" | "createdAt" | "updatedAt">;

export type UpdatedUser = Partial<User>;
