import { RefreshToken } from "@prisma/client";
import { Todo } from "./todo.model";
import { OTP } from "./otp.model";

export interface User {
  id: string;
  email: string;
  password: string;
  avatar: string;
  verified?: boolean;
  todos?: Todo[];
  refreshTokens?: RefreshToken[];
  opt?: OTP[];
  createdAt: Date;
  updatedAt: Date;
}

export type UserCreateInput = Pick<User, "email" | "password" | "avatar">;

export type UserUpdateInput = Partial<
  Pick<User, "email" | "password" | "avatar" | "verified">
>;
