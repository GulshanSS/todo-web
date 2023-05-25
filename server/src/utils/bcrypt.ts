import bcrypt from "bcrypt";

export const hash = async (data: string): Promise<string> => {
  return await bcrypt.hash(data, parseInt(process.env.SALT_ROUNDS as string));
};

export const compare = async (
  data: string,
  existingData: string
): Promise<boolean> => {
  return await bcrypt.compare(data, existingData);
};
