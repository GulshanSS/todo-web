import { User } from "./user.model";

export interface OTP {
  id: string;
  hashedOTP: string;
  userId: string;
  user: User;
  createdAt: Date;
  updatedAt: Date;
}
