import { CookieOptions } from "express";

export const accessTokenCookieOptions: CookieOptions = {
  expires: new Date(
    Date.now() +
      parseInt(process.env.COOKIE_ACCESS_TOKEN_EXPIRES_TIME as string) *
        60 *
        1000
  ),
  maxAge:
    parseInt(process.env.COOKIE_ACCESS_TOKEN_EXPIRES_TIME as string) *
    60 *
    1000,
  httpOnly: true,
  sameSite: "lax",
};

export const refreshTokenCookieOptions: CookieOptions = {
  expires: new Date(
    Date.now() +
      parseInt(process.env.COOKIE_REFRESH_TOKEN_EXPIRES_TIME as string) *
        60 *
        1000
  ),
  maxAge:
    parseInt(process.env.COOKIE_REFRESH_TOKEN_EXPIRES_TIME as string) *
    60 *
    1000,
  httpOnly: true,
  sameSite: "lax",
};
