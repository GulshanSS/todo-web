import { Request, Response, NextFunction } from "express";
import logger from "../config/logger";
import { verifyToken } from "../utils/jwt";
import { TokenPayload } from "../model/tokenPayload.model";

export const isAutheticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let access_token;
    if (
      req.headers.authorization &&
      req.headers.authorization?.startsWith("Bearer")
    ) {
      access_token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.access_token) {
      access_token = req.cookies.access_token;
    }
    if (!access_token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    const payload: TokenPayload = verifyToken(
      access_token,
      process.env.JWT_ACCESS_TOKEN_SECRET as string
    );
    req.payload = payload as TokenPayload;
    return next();
  } catch (e: unknown) {
    if (e instanceof Error) logger.error(e.message);
  }
};
