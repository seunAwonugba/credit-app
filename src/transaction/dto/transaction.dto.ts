import { IsNotEmpty } from 'class-validator';
import {
  AMOUNT_REQUIRED,
  RECEIVER_REQUIRED,
  USER_ID_REQUIRED,
} from '../../constant/constants';

export class FundDto {
  @IsNotEmpty({ message: USER_ID_REQUIRED })
  userId: number;

  @IsNotEmpty({ message: AMOUNT_REQUIRED })
  amount: number;
}

export class TransferDto {
  @IsNotEmpty({ message: RECEIVER_REQUIRED })
  receiverId: number;

  @IsNotEmpty({ message: AMOUNT_REQUIRED })
  amount: number;
}

export class UserDto {
  @IsNotEmpty({ message: USER_ID_REQUIRED })
  userId: string;
}
