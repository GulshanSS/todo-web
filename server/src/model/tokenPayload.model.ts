export interface TokenPayload {
  userId: string;
  jti?: string;
  iat: number;
  exp: number;
}

