import {
  Body,
  Controller,
  HttpStatus,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { ACCOUNT_NOT_FOUND, ACCOUNT_PREFIX } from '../constant/constants';
import { AccountService } from './account.service';
import { UserDto } from '../transaction/dto/transaction.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('JWT')
@Controller(ACCOUNT_PREFIX)
export class AccountController {
  constructor(private accountService: AccountService) {}

  /**
   * A user can get an account record
   */
  @Post()
  async getAccountByUserId(@Body() userDto: UserDto) {
    const userId = userDto.userId;

    const account = await this.accountService.getAccountByUserId(
      Number(userId),
    );
    if (!account) throw new NotFoundException(ACCOUNT_NOT_FOUND);

    return {
      statusCode: HttpStatus.OK,
      data: account,
      message: HttpStatus.OK,
    };
  }
}
