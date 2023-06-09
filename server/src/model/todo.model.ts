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

export type TodoCreateInput = Omit<
  Todo,
  "id" | "createdAt" | "updatedAt" | "owner"
>;

export type TodoUpdateInput = Partial<TodoCreateInput>;
