import { Response, Request } from "express";
import logger from "../config/logger";
import { UserUpdateInput, User } from "../model/user.model";
import {
  deleteUserById,
  getUserByEmail,
  getUserById,
  updateUserById,
} from "../services/user.service";

export const getUserByIdHandler = async (
  req: Request,
  res: Response
): Promise<Response | undefined> => {
  try {
    const userId: string = req.payload.userId;
    const foundUser = (await getUserById(userId)) as User;
    if (!foundUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      user: {
        id: foundUser.id,
        email: foundUser.email,
        avatar: foundUser.avatar,
        verified: foundUser.verified,
      },
    });
  } catch (e: unknown) {
    if (e instanceof Error) logger.error(e.message);
  }
};

export const getUserByEmailHandler = async (
  req: Request,
  res: Response
): Promise<Response | undefined> => {
  try {
    const email: string = req.body.email;
    const foundUser = (await getUserByEmail(email)) as User;
    if (!foundUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      user: foundUser,
    });
  } catch (e: unknown) {
    if (e instanceof Error) logger.error(e.message);
  }
};

export const updateUserByIdHandler = async (
  req: Request,
  res: Response
): Promise<Response | undefined> => {
  try {
    const userId: string = req.payload.userId;
    const oldUser = (await getUserById(userId)) as User;
    if (!oldUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const userData: UserUpdateInput = req.body;
    const updatedUser = (await updateUserById(userId, userData)) as User;
    return res.status(201).json({
      success: true,
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        avatar: updatedUser.avatar,
        verified: updatedUser.verified,
      },
    });
  } catch (e: unknown) {
    if (e instanceof Error) logger.error(e.message);
  }
};

export const deleteUserByIdHandler = async (
  req: Request,
  res: Response
): Promise<Response | undefined> => {
  try {
    const userId: string = req.payload.userId;
    const user = (await getUserById(userId)) as User;
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const deletedUser = (await deleteUserById(userId)) as User;
    return res.status(200).json({
      success: true,
      message: `User deleted Successfully with email ${deletedUser.email}`,
    });
  } catch (e: unknown) {
    if (e instanceof Error) logger.error(e.message);
  }
};
