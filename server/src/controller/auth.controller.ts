import { Request, Response } from "express";
import logger from "../config/logger";
import { User, UserCreateInput } from "../model/user.model";
import {
  createUser,
  getUserByEmail,
  getUserById,
} from "../services/user.service";
import { compare, hash } from "../utils/bcrypt";
import { generateTokens, verifyToken } from "../utils/jwt";
import {
  deleteRefreshTokenById,
  deleteRefreshTokenByUserId,
  getRefreshTokenById,
  whiteListRefreshToken,
} from "../services/token.service";
import { v4 as uuidv4 } from "uuid";
import { RefreshToken } from "../model/refreshToken.model";
import hashGivenString from "../utils/hashGvenString";
import { TokenPayload } from "../model/tokenPayload.model";
import { getRandomKittenAvatars } from "../utils/randomKittenAvatar";
import {
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
} from "../utils/tokenCookieOptions";

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
      avatar: getRandomKittenAvatars(),
    };
    const user = (await createUser(data)) as User;

    return res.status(201).json({
      success: true,
      userId: user.id,
      message: `Registered Successfully with email ${user.email}`,
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
    if (!existingUser.verified) {
      return res.status(403).json({
        success: false,
        userId: existingUser.id,
        message: `Please verify existing user with email ${existingUser.email}`,
      });
    }
    const jti: string = uuidv4();
    const { accessToken, refreshToken } = generateTokens(existingUser, jti);
    await whiteListRefreshToken({ refreshToken, jti, user: existingUser });
    res.cookie("access_token", accessToken, accessTokenCookieOptions);
    res.cookie("refresh_token", refreshToken, refreshTokenCookieOptions);
    res.cookie("logged_in", true, {
      ...accessTokenCookieOptions,
      httpOnly: false,
    });
    return res.status(200).json({
      success: true,
      accessToken,
    });
  } catch (e: unknown) {
    if (e instanceof Error) logger.error(e.message);
  }
};

export const refreshTokenHandler = async (req: Request, res: Response) => {
  try {
    const refreshToken: string = req.body.refreshToken;
    const payload: TokenPayload = verifyToken(
      refreshToken,
      process.env.JWT_REFRESH_TOKEN_SECRET as string
    );
    if (!payload.jti || !payload.userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    const savedRefreshToken = (await getRefreshTokenById(
      payload.jti
    )) as RefreshToken;
    if (!savedRefreshToken || savedRefreshToken.revoked === true) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    const hashedToken = hashGivenString(refreshToken);
    if (hashedToken !== savedRefreshToken.hashedToken) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    const user = (await getUserById(payload.userId)) as User;
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    await deleteRefreshTokenById(savedRefreshToken.id);
    const jti: string = uuidv4();
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(
      user,
      jti
    );
    await whiteListRefreshToken({ refreshToken: newRefreshToken, jti, user });

    res.cookie("access_token", accessToken, accessTokenCookieOptions);
    res.cookie("refresh_token", refreshToken, refreshTokenCookieOptions);
    res.cookie("logged_in", true, {
      ...accessTokenCookieOptions,
      httpOnly: false,
    });

    return res.status(201).json({
      success: true,
      accessToken,
    });
  } catch (e: unknown) {
    if (e instanceof Error) logger.error(e.message);
  }
};

export const logoutHandler = async (req: Request, res: Response) => {
  try {
    let refreshToken: string;
    if (req.body.refreshToken !== undefined) {
      refreshToken = req.body.refreshToken;
    } else {
      refreshToken = req.cookies["refresh_token"];
    }
    const payload: TokenPayload = verifyToken(
      refreshToken,
      process.env.JWT_REFRESH_TOKEN_SECRET as string
    );
    if (!payload.jti || !payload.userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    await deleteRefreshTokenByUserId(payload.userId);
    res.cookie("access_token", "", { maxAge: 1 });
    res.cookie("refresh_token", "", { maxAge: 1 });
    res.cookie("logged_in", "", { maxAge: 1 });
    return res.status(201).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (e: unknown) {
    if (e instanceof Error) logger.error(e.message);
  }
};
