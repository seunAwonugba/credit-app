import { Body, Controller, HttpStatus, Post, Req } from '@nestjs/common';
import {
  FUND_URL,
  TRANSACTION_URL,
  TRANSFER_URL,
  WITHDRAW_URL,
} from '../constant/constants';
import { TransactionService } from './transaction.service';
import { FundDto, TransferDto, UserDto } from './dto/transaction.dto';
import { Request } from 'express';

@Controller(TRANSACTION_URL)
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Post(FUND_URL)
  async fundAccount(@Body() fundDto: FundDto) {
    const fund = await this.transactionService.fundAccount(fundDto);
    return {
      statusCode: HttpStatus.OK,
      data: fund,
      message: HttpStatus.OK,
    };
  }

  @Post(WITHDRAW_URL)
  async withdraw(@Body() fundDto: FundDto) {
    const fund = await this.transactionService.withdraw(fundDto);
    return {
      statusCode: HttpStatus.OK,
      data: fund,
      message: HttpStatus.OK,
    };
  }

  @Post(TRANSFER_URL)
  async transfer(@Body() transferDto: TransferDto, @Req() req: Request) {
    const user = req.user;

    const transferPayload = {
      ...transferDto,
      user,
    };

    const transfer = await this.transactionService.transfer(transferPayload);
    return {
      statusCode: HttpStatus.OK,
      data: transfer,
      message: HttpStatus.OK,
    };
  }

  @Post()
  async getTransactions(@Body() userDto: UserDto) {
    const userId = userDto.userId;

    const transactions =
      await this.transactionService.getTransactionsByUserId(userId);
    return {
      statusCode: HttpStatus.OK,
      data: transactions,
      message: HttpStatus.OK,
    };
  }
}
