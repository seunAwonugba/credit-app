import * as bcrypt from 'bcrypt';

export const hashData = async (data: string) => {
  const hash = await bcrypt.hash(data, Number(process.env.SALT));
  return hash;
};

export const compareHash = async (payload: any) => {
  const { password, hash } = payload;
  const isMatch = await bcrypt.compare(password, hash);
  return isMatch;
};
