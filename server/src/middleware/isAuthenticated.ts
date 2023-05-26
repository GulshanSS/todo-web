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
    const authorization: string | undefined = req.headers.authorization;
    if (!authorization) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    const token = authorization.split(" ")[1];
    const payload: TokenPayload = verifyToken(
      token,
      process.env.JWT_ACCESS_TOKEN_SECRET as string
    );
    req.payload = payload as TokenPayload;
    return next();
  } catch (e: unknown) {
    if (e instanceof Error) logger.error(e.message);
  }
};
