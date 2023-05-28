import { Request, Response } from "express";
import { User } from "../model/user.model";
import { getUserById, updateUserById } from "../services/user.service";
import {
  createOTP,
  deleteOTP,
  getOTP,
  updateOTP,
} from "../services/otp.service";
import { OTP } from "../model/otp.model";
import { generateOtp } from "../utils/otp";
import { sendEmail } from "../utils/email";
import logger from "../config/logger";
import { VerifyOtpPayload } from "../model/verifyOtpPayload.model";
import hashToken from "../utils/hashToken";
import { v4 as uuidv4 } from "uuid";
import { generateTokens } from "../utils/jwt";
import { whiteListRefreshToken } from "../services/token.service";

export const sendOtpHandler = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const registeredUser = (await getUserById(userId)) as User;
    if (!registeredUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const savedOTP = (await getOTP(userId)) as OTP;

    const otp: string = generateOtp();
    if (!savedOTP) {
      await createOTP({ userId: registeredUser.id, otp });
    } else {
      await updateOTP(userId, otp);
    }
    await sendEmail({ email: registeredUser.email, otp });
    return res.status(201).json({
      success: true,
      message: `Otp sent to the registered email ${registeredUser.email}`,
    });
  } catch (e: unknown) {
    if (e instanceof Error) logger.error(e.message);
  }
};

export const verifyOTPhandler = async (req: Request, res: Response) => {
  try {
    const data: VerifyOtpPayload = req.body;
    const savedUser = (await getUserById(data.userId)) as User;
    if (!savedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const savedOTP = (await getOTP(savedUser.id)) as OTP;
    if (!savedOTP) {
      return res.status(404).json({
        success: false,
        message: "OTP not found for provided user",
      });
    }
    const hashedOTP = hashToken(data.otp);
    if (hashedOTP !== savedOTP.hashedOTP) {
      return res.status(403).json({
        success: false,
        message: `Invalid OTP. Please enter valid otp sent to ${savedUser.email}`,
      });
    }
    await updateUserById(savedUser.id, { verified: true });
    await deleteOTP(savedUser.id);
    const jti: string = uuidv4();
    const { accessToken, refreshToken } = generateTokens(savedUser, jti);
    await whiteListRefreshToken({ refreshToken, jti, user: savedUser });
    return res.status(200).json({
      success: true,
      accessToken,
      refreshToken,
    });
  } catch (e: unknown) {
    if (e instanceof Error) logger.error(e.message);
  }
};
