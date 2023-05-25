export default interface JwtRefreshTokenPayload {
  userId: string;
  jti: string;
  iat: number;
  exp: number;
}
