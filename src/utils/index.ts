import { BadRequestException } from '@nestjs/common';
import { PASSWORD_MATCH } from '../constant/constants';

export const matchingPassword = (payload: any) => {
  const password = payload.password;
  const confirmPassword = payload.confirmPassword;

  if (password !== confirmPassword) {
    throw new BadRequestException(PASSWORD_MATCH);
  }
};


