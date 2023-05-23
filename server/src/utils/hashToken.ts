import crypto from "crypto";

const hashToken = (token: string): string => {
  return crypto
    .createHash(process.env.HASHING_ALGORITHM as string)
    .update(token)
    .digest(process.env.HASHING_DIGEST as crypto.BinaryToTextEncoding);
};

export default hashToken;
