import prisma from "../config/prisma";
import { CreateUser, UpdatedUser, User } from "../model/user.model";

export const createUser = async (user: CreateUser): Promise<User> => {
  const createdUser: User = await prisma.user.create({
    data: user,
  });
  return createdUser;
};

export const getAllUsers = async (): Promise<User[]> => {
  const users: User[] = await prisma.user.findMany();
  return users;
};

export const getUserById = async (userId: string): Promise<User | boolean> => {
  const foundUser: User | null = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!foundUser) {
    return false;
  }
  return foundUser;
};

export const getUserByEmail = async (
  email: string
): Promise<User | boolean> => {
  const foundUser: User | null = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!foundUser) {
    return false;
  }
  return foundUser;
};

export const updateUserById = async (
  userId: string,
  userData: UpdatedUser
): Promise<User | boolean> => {
  const oldUser: User | boolean = await getUserById(userId);
  if (!oldUser) {
    return false;
  }
  const updatedUser: User = await prisma.user.update({
    where: {
      id: userId,
    },
    data: userData,
  });

  return updatedUser;
};

export const deleteUserById = async (userId: string): Promise<boolean> => {
  const user: User | boolean = await getUserById(userId);
  if (!user) {
    return false;
  }
  await prisma.user.delete({
    where: {
      id: userId,
    },
  });
  return true;
};
