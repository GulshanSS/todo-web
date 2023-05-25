import { Request, Response } from "express";
import logger from "../config/logger";
import { User, UserCreateInput } from "../model/user.model";
import { createUser, getUserByEmail } from "../services/user.service";
import { compare, hash } from "../utils/bcrypt";
import { generateTokens } from "../utils/jwt";
import { whiteListRefreshToken } from "../services/token.service";
import { v4 as uuidv4 } from "uuid";

export const registerHandler = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: `User is already in use with this ${email}`,
      });
    }
    const hashedPassword = await hash(password);
    const data: UserCreateInput = {
      email,
      password: hashedPassword,
    };
    const user = (await createUser(data)) as User;
    const jti = uuidv4();
    const { accessToken, refreshToken } = generateTokens(user, jti);
    await whiteListRefreshToken({ refreshToken, jti, user });
    return res.status(201).json({
      success: true,
      accessToken,
      refreshToken,
    });
  } catch (e: unknown) {
    if (e instanceof Error) logger.error(e.message);
  }
};

export const loginHandler = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const existingUser = (await getUserByEmail(email)) as User;
    if (!existingUser) {
      return res.status(403).json({
        success: false,
        message: `No user found with ${email}. Please register or login with different email`,
      });
    }
    const validPassword = await compare(password, existingUser.password);
    if (!validPassword) {
      return res.status(403).json({
        success: false,
        message: "Incorrect password. Try again with different password",
      });
    }
    const jti = uuidv4();
    const { accessToken, refreshToken } = generateTokens(existingUser, jti);
    await whiteListRefreshToken({ refreshToken, jti, user: existingUser });
    return res.status(200).json({
      success: true,
      accessToken,
      refreshToken,
    });
  } catch (e: unknown) {
    if (e instanceof Error) logger.error(e.message);
  }
};
