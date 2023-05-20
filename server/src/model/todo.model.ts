export interface Todo {
  id: string;
  task: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateTodo = Omit<Todo, "id" | "createdAt" | "updatedAt">;

export type UpdateTodo = Partial<Todo>;
