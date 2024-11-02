import { BadRequestException, Injectable } from '@nestjs/common';
import { Fund } from '../interfaces/transaction.interface';
import { UserService } from '../user/user.service';
import { AccountService } from '../account/account.service';
import {
  INSUFFICIENT_ACCOUNT,
  RECEIVER_NOT_FOUND,
  USER_NOT_FOUND,
} from '../constant/constants';
import { TransactionType, Status, Action } from '../enum/enums';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';

@Injectable()
export class TransactionService {
  constructor(
    private userService: UserService,
    private accountService: AccountService,
    @InjectConnection() private readonly knex: Knex,
  ) {}

  async createTransaction(payload: any) {
    const [id] = await this.knex.table('transactions').insert({ ...payload });
    const transaction = await this.getTransaction(id);
    return transaction;
  }

  async getTransaction(id: number) {
    const transaction = await this.knex
      .table('transactions')
      .select('*')
      .where({
        id,
      })
      .first();
    return transaction;
  }

  async fundAccount(fund: Fund) {
    const userId = fund.userId;
    const amount = fund.amount;
    const user = await this.userService.getUser(userId);
    if (!user) {
      throw new BadRequestException(USER_NOT_FOUND);
    }

    const accountBeforeCredit =
      await this.accountService.getAccountByUserId(userId);

    const accountId = accountBeforeCredit.id;
    const balanceBefore = accountBeforeCredit.balance;
    //increase balance
    const creditAccountPayload = {
      accountId,
      amount,
    };
    await this.accountService.creditAccount(creditAccountPayload);
    const accountAfterCredit = await this.accountService.getAccount(accountId);

    const balanceAfter = accountAfterCredit.balance;
    const transactionPayload = {
      transactionType: TransactionType.CREDIT,
      status: Status.SUCCESS,
      action: Action.FUND,
      userId: String(user.id),
      amount,
      balanceBefore,
      balanceAfter,
    };

    const createTransaction = await this.createTransaction(transactionPayload);
    return createTransaction;
  }

  async withdraw(fund: Fund) {
    const userId = fund.userId;
    const amount = fund.amount;
    const user = await this.userService.getUser(userId);
    if (!user) {
      throw new BadRequestException(USER_NOT_FOUND);
    }

    const accountBeforeWithdrawal =
      await this.accountService.getAccountByUserId(userId);
    const accountBalanceBeforeWithdrawal = accountBeforeWithdrawal.balance;

    if (Number(amount) > Number(accountBalanceBeforeWithdrawal)) {
      throw new BadRequestException(INSUFFICIENT_ACCOUNT);
    }
    const accountId = accountBeforeWithdrawal.id;

    const balanceBefore = accountBeforeWithdrawal.balance;
    //debit account
    const withdrawPayload = {
      accountId,
      amount,
    };
    await this.accountService.debitAccount(withdrawPayload);
    const account = await this.accountService.getAccount(accountId);
    const balanceAfter = account.balance;
    const transactionPayload = {
      transactionType: TransactionType.DEBIT,
      status: Status.SUCCESS,
      action: Action.WITHDRAW,
      userId: String(user.id),
      amount,
      balanceBefore,
      balanceAfter,
    };
    const withdraw = await this.createTransaction(transactionPayload);
    return withdraw;
  }

  async transfer(transfer: any) {
    const userId = transfer.user.id;
    const receiverId = transfer.receiverId;
    const amount = transfer.amount;
    const user = await this.userService.getUser(userId);
    const receiver = await this.userService.getUser(receiverId);
    if (!user) {
      throw new BadRequestException(USER_NOT_FOUND);
    }
    if (!receiver) {
      throw new BadRequestException(RECEIVER_NOT_FOUND);
    }

    const receiverAccountBeforeTransfer =
      await this.accountService.getAccountByUserId(receiver.id);

    const receiverAccountBalanceBeforeTransfer =
      receiverAccountBeforeTransfer.balance;

    const receiverAccountId = receiverAccountBeforeTransfer.id;

    // receiver.account.balance;
    // check user has enough to transfer
    const userAccountBeforeTransfer =
      await this.accountService.getAccountByUserId(user.id);

    const userAccountBalanceBeforeTransfer = userAccountBeforeTransfer.balance;
    const userAccountId = userAccountBeforeTransfer.id;
    if (Number(userAccountBalanceBeforeTransfer) < Number(amount)) {
      throw new BadRequestException(INSUFFICIENT_ACCOUNT);
    }

    try {
      // await this.knex.transaction(async (trx) => {
      //debit user account
      const debitAccountPayload = {
        accountId: userAccountId,
        amount,
      };
      await this.accountService.debitAccount(debitAccountPayload);
      //credit receiver account
      const creditAccountPayload = {
        accountId: receiverAccountId,
        amount,
      };

      await this.accountService.creditAccount(creditAccountPayload);
      //get user balance after debit
      const userAccountAfterDebit =
        await this.accountService.getAccount(userAccountId);
      const userAccountBalanceAfterDebit = userAccountAfterDebit.balance;
      //get receiver balance after credit

      const receiverAccountAfterCredit =
        await this.accountService.getAccount(receiverAccountId);

      const receiverAccountBalanceAfterCredit =
        receiverAccountAfterCredit.balance;
      //user transaction payload
      const debitPayload = {
        transactionType: TransactionType.DEBIT,
        status: Status.SUCCESS,
        action: Action.TRANSFER,
        userId: String(user.id),
        amount,
        balanceBefore: userAccountBalanceBeforeTransfer,
        balanceAfter: userAccountBalanceAfterDebit,
      };

      //receiver transaction payload
      const creditPayload = {
        transactionType: TransactionType.CREDIT,
        status: Status.SUCCESS,
        action: Action.TRANSFER,
        userId: String(receiver.id),
        amount,
        balanceBefore: receiverAccountBalanceBeforeTransfer,
        balanceAfter: receiverAccountBalanceAfterCredit,
      };

      const debit = await this.createTransaction(debitPayload);
      await this.createTransaction(creditPayload);

      return debit;
    } catch (err: any) {
      throw new BadRequestException(err.message);
    }
  }

  async getTransactionsByUserId(userId: string) {
    const transaction = await this.knex
      .table('transactions')
      .select('*')
      .where({
        userId,
      });
    return transaction;
  }
}
