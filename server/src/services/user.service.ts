import prisma from "../config/prisma";
import { UserCreateInput, UserUpdateInput } from "../model/user.model";

export const createUser = async (user: UserCreateInput) => {
  return await prisma.user.create({
    data: user,
  });
};

export const getAllUsers = async () => {
  return await prisma.user.findMany();
};

export const getUserById = async (userId: string) => {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
};

export const getUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};

export const updateUserById = async (
  userId: string,
  userData: UserUpdateInput
) => {
  return prisma.user.update({
    where: {
      id: userId,
    },
    data: userData,
  });
};

export const deleteUserById = async (userId: string) => {
  return await prisma.user.delete({
    where: {
      id: userId,
    },
  });
};
