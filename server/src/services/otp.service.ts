import prisma from "../config/prisma";
import hashGivenString from "../utils/hashGvenString";

export const createOTP = async (data: { userId: string; otp: string }) => {
  return await prisma.oneTimePasscode.create({
    data: {
      userId: data.userId,
      hashedOTP: hashGivenString(data.otp),
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
      hashedOTP: hashGivenString(otp),
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
