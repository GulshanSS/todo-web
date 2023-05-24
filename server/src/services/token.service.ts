import prisma from "../config/prisma";
import hashToken from "../utils/hashToken";

export const whiteListRefreshToken = async (data: {
  refreshToken: string;
  userId: string;
}) => {
  return await prisma.refreshToken.create({
    data: { userId: data.userId, hashedToken: hashToken(data.refreshToken) },
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
