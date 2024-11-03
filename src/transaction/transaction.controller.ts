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
import { ApiBearerAuth } from '@nestjs/swagger';
import { ReasonPhrases } from 'http-status-codes';

@Controller(TRANSACTION_URL)
@ApiBearerAuth('JWT')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  /**
   * A user can fund their account
   */
  @Post(FUND_URL)
  async fundAccount(@Body() fundDto: FundDto) {
    const fund = await this.transactionService.fundAccount(fundDto);

    return {
      statusCode: HttpStatus.CREATED,
      data: fund,
      message: ReasonPhrases.CREATED,
    };
  }

  /**
   * A user can withdraw funds from their account
   */
  @Post(WITHDRAW_URL)
  async withdraw(@Body() fundDto: FundDto) {
    const fund = await this.transactionService.withdraw(fundDto);
    return {
      statusCode: HttpStatus.CREATED,
      data: fund,
      message: ReasonPhrases.CREATED,
    };
  }

  /**
   * A user can transfer funds to another user’s account
   */
  @Post(TRANSFER_URL)
  async transfer(@Body() transferDto: TransferDto, @Req() req: Request) {
    const user = req.user;

    const transferPayload = {
      ...transferDto,
      user,
    };

    const transfer = await this.transactionService.transfer(transferPayload);
    return {
      statusCode: HttpStatus.CREATED,
      data: transfer,
      message: ReasonPhrases.CREATED,
    };
  }

  /**
   * A user can get a record of account transactions
   */
  @Post()
  async getTransactions(@Body() userDto: UserDto) {
    const userId = userDto.userId;

    const transactions =
      await this.transactionService.getTransactionsByUserId(userId);
    return {
      statusCode: HttpStatus.OK,
      data: transactions,
      message: ReasonPhrases.OK,
    };
  }
}
