import * as bcrypt from 'bcrypt';

export const hashData = async (data: string) => {
  const hash = await bcrypt.hash(data, Number(process.env.SALT));
  return hash;
};
