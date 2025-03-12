import bcrypt from 'bcrypt';

export const encryptPassword = async (pass: string): Promise<string> => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(pass, saltRounds);
  return hashedPassword;
};
