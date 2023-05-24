import { RefreshToken } from "@prisma/client";
import { Todo } from "./todo.model";

export interface User {
  id: string;
  email: string;
  password: string;
  todos: Todo[];
  refreshTokens: RefreshToken[];
  createdAt: Date;
  updatedAt: Date;
}

export type UserCreateInput = Omit<User, "id" | "createdAt" | "updatedAt">;

export type UserUpdateInput = Partial<UserCreateInput>;
