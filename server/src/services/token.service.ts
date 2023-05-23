import prisma from "../config/prisma";
import { RefreshToken } from "../model/refreshToken.model";
import hashToken from "../utils/hashToken";

export const whiteListRefreshToken = async (data: {
  refreshToken: string;
  userId: string;
}): Promise<RefreshToken> => {
  const refreshToken: RefreshToken = await prisma.refreshToken.create({
    data: { userId: data.userId, hashedToken: hashToken(data.refreshToken) },
  });
  return refreshToken;
};

export const getRefreshTokenById = async (
  refreshTokenId: string
): Promise<RefreshToken | boolean> => {
  const foundRefreshToken: RefreshToken | null =
    await prisma.refreshToken.findUnique({
      where: {
        id: refreshTokenId,
      },
    });
  if (!foundRefreshToken) {
    return false;
  }
  return foundRefreshToken;
};

export const deleteRefreshTokenById = async (
  refreshTokenId: string
): Promise<boolean> => {
  const foundRefreshToken: RefreshToken | boolean = await getRefreshTokenById(
    refreshTokenId
  );
  if (!foundRefreshToken) {
    return false;
  }
  await prisma.refreshToken.delete({
    where: {
      id: refreshTokenId,
    },
  });
  return true;
};

export const checkRefreshTokensAssignedToUser = async (
  userId: string
): Promise<boolean> => {
  const foundRefreshTokens: RefreshToken[] = await prisma.refreshToken.findMany(
    {
      where: {
        userId,
      },
    }
  );
  if (foundRefreshTokens.length === 0) {
    return false;
  }
  return true;
};

export const revokeAllRefreshTokenAssignedToUser = async (
  userId: string
): Promise<boolean> => {
  const foundRefreshTokens: boolean = await checkRefreshTokensAssignedToUser(
    userId
  );
  if (!foundRefreshTokens) {
    return false;
  }
  await prisma.refreshToken.updateMany({
    where: {
      userId,
    },
    data: {
      revoked: true,
    },
  });
  return true;
};
