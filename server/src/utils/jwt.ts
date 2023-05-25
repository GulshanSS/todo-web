import jwt from "jsonwebtoken";
import { User } from "../model/user.model";
import { TokenPayload } from "../model/tokenPayload.model";

export const generateAccessToken = (user: User): string => {
  return jwt.sign(
    { id: user.id },
    process.env.JWT_ACCESS_TOKEN_SECRET as string,
    { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRE_TIME as string }
  );
};

export const generateRefreshToken = (user: User, jti: string): string => {
  return jwt.sign(
    { userId: user.id, jti },
    process.env.JWT_REFRESH_TOKEN_SECRET as string,
    { expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRE_TIME as string }
  );
};

export const generateTokens = (
  user: User,
  jti: string
): {
  accessToken: string;
  refreshToken: string;
} => {
  const accessToken: string = generateAccessToken(user);
  const refreshToken: string = generateRefreshToken(user, jti);

  return {
    accessToken,
    refreshToken,
  };
};

export const verifyToken = (refreshToken: string, jwtSecret: string) =>
  jwt.verify(refreshToken, jwtSecret) as TokenPayload;
