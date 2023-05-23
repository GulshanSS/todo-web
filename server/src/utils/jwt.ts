import jwt from "jsonwebtoken";
import { User } from "../model/user.model";

const generateToken = (
  user: User,
  jwtSecret: string,
  expiresIn: string
): string => {
  return jwt.sign({ id: user.id }, jwtSecret, {
    expiresIn,
  });
};

const generateAccessToken = (user: User): string =>
  generateToken(
    user,
    process.env.JWT_ACCESS_TOKEN_SECRET as string,
    process.env.JWT_ACCESS_TOKEN_EXPIRE_TIME as string
  );

const generateRefreshToken = (user: User): string =>
  generateToken(
    user,
    process.env.JWT_REFRESH_TOKEN_SECRET as string,
    process.env.JWT_REFRESH_TOKEN_EXPIRE_TIME as string
  );

const generateTokens = (
  user: User
): {
  accessToken: string;
  refreshToken: string;
} => {
  const accessToken: string = generateAccessToken(user);
  const refreshToken: string = generateRefreshToken(user);

  return {
    accessToken,
    refreshToken,
  };
};

export default {
  generateAccessToken,
  generateRefreshToken,
  generateTokens,
};
