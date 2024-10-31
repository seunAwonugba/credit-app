import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';
import {
  FIRST_NAME_REQUIRED,
  LAST_NAME_REQUIRED,
  INVALID_EMAIL,
  EMAIL_REQUIRED,
  PASSWORD_REQUIRED,
  CONFIRM_PASSWORD_REQUIRED,
  STRONG_PASSWORD,
} from '../../constant/constants';

export class SignUpDto {
  @IsNotEmpty({ message: FIRST_NAME_REQUIRED })
  firstName: string;

  @IsNotEmpty({ message: LAST_NAME_REQUIRED })
  lastName: string;

  @IsNotEmpty({ message: EMAIL_REQUIRED })
  @IsEmail({}, { message: INVALID_EMAIL })
  email: string;

  @IsStrongPassword({}, { message: STRONG_PASSWORD })
  @IsNotEmpty({ message: PASSWORD_REQUIRED })
  password: string;

  @IsNotEmpty({ message: CONFIRM_PASSWORD_REQUIRED })
  confirmPassword: string;
}

export class LoginDto {
  @IsNotEmpty({ message: EMAIL_REQUIRED })
  @IsEmail({}, { message: INVALID_EMAIL })
  email: string;

  @IsNotEmpty({ message: PASSWORD_REQUIRED })
  password: string;
}
