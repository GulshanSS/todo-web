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

export type UserCreateInput = Pick<User, "email" | "password">;

export type UserUpdateInput = Partial<UserCreateInput>;
