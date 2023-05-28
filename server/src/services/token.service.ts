import prisma from "../config/prisma";
import { User } from "../model/user.model";
import hashGivenString from "../utils/hashGvenString";

export const whiteListRefreshToken = async (data: {
  refreshToken: string;
  jti: string;
  user: User;
}) => {
  return await prisma.refreshToken.create({
    data: {
      id: data.jti,
      hashedToken: hashGivenString(data.refreshToken),
      userId: data.user.id,
    },
  });
};

export const getRefreshTokenById = async (refreshTokenId: string) => {
  return await prisma.refreshToken.findUnique({
    where: {
      id: refreshTokenId,
    },
  });
};

export const deleteRefreshTokenById = async (refreshTokenId: string) => {
  return await prisma.refreshToken.update({
    where: {
      id: refreshTokenId,
    },
    data: {
      revoked: true,
    },
  });
};

export const checkRefreshTokensAssignedToUser = async (userId: string) => {
  return await prisma.refreshToken.findMany({
    where: {
      userId,
    },
  });
};

export const revokeAllRefreshTokenAssignedToUser = async (userId: string) => {
  return await prisma.refreshToken.updateMany({
    where: {
      userId,
    },
    data: {
      revoked: true,
    },
  });
};
