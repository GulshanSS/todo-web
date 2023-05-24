import { User } from "./user.model";

export interface RefreshToken {
  id: string;
  hashedToken: string;
  userId: string;
  user: User;
  revoked: boolean;
  createdAt: Date;
  updatedAt: Date;
}
