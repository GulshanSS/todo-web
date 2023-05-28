import prisma from "../config/prisma";
import hashToken from "../utils/hashToken";

export const createOTP = async (data: { userId: string; otp: string }) => {
  return await prisma.oneTimePasscode.create({
    data: {
      userId: data.userId,
      hashedOTP: hashToken(data.otp),
    },
  });
};

export const getOTP = async (userId: string) => {
  return await prisma.oneTimePasscode.findFirst({
    where: {
      userId,
    },
  });
};

export const updateOTP = async (userId: string, otp: string) => {
  return await prisma.oneTimePasscode.update({
    where: {
      userId,
    },
    data: {
      hashedOTP: hashToken(otp),
    },
  });
};

export const deleteOTP = async (userId: string) => {
  return await prisma.oneTimePasscode.delete({
    where: {
      userId,
    },
  });
};
