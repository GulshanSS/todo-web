import { Response, Request } from "express";
import logger from "../config/logger";
import { UpdatedUser, User } from "../model/user.model";
import {
  deleteUserById,
  getAllUsers,
  getUserByEmail,
  getUserById,
  updateUserById,
} from "../services/user.service";

export const getAllUsersHandler = async (
  req: Request,
  res: Response
): Promise<Response | undefined> => {
  try {
    const users: User[] = await getAllUsers();
    return res.status(200).json({
      success: true,
      users,
    });
  } catch (e: unknown) {
    if (e instanceof Error) logger.error(e.message);
  }
};

export const getUserByIdHandler = async (
  req: Request,
  res: Response
): Promise<Response | undefined> => {
  try {
    const userId: string = req.params.userId;
    const foundUser: User | boolean = await getUserById(userId);
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

export const getUserByEmailHandler = async (
  req: Request,
  res: Response
): Promise<Response | undefined> => {
  try {
    const email: string = req.body.email;
    const foundUser: User | boolean = await getUserByEmail(email);
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
    const userId: string = req.params.userId;
    const userData: UpdatedUser = req.body;
    const updatedUser: User | boolean = await updateUserById(userId, userData);
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(201).json({
      success: true,
      user: updatedUser,
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
    const userId: string = req.params.userId;
    const deletedTodo: boolean = await deleteUserById(userId);
    if (!deletedTodo) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User deleted Successfully",
    });
  } catch (e: unknown) {
    if (e instanceof Error) logger.error(e.message);
  }
};
