import { BadRequestException, Injectable } from '@nestjs/common';
import { Transaction } from './transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Fund } from '../interfaces/transaction.interface';
import { UserService } from '../user/user.service';
import {
  INSUFFICIENT_ACCOUNT,
  RECEIVER_NOT_FOUND,
  USER_NOT_FOUND,
} from '../constant/constants';
import { AccountService } from '../account/account.service';
import { Action, Status, TransactionType } from '../enum/enums';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    private userService: UserService,
    private accountService: AccountService,
    private dataSource: DataSource,
  ) {}

  async fundAccount(fund: Fund) {
    const userId = fund.userId;
    const amount = fund.amount;

    const user = await this.userService.getUser(userId);

    if (!user) {
      throw new BadRequestException(USER_NOT_FOUND);
    }
    const accountId = user.account.id;
    const balanceBefore = user.account.balance;

    //increase balance

    const creditAccountPayload = {
      accountId,
      amount,
    };

    await this.accountService.creditAccount(creditAccountPayload);

    const account = await this.accountService.getAccount(accountId);
    const balanceAfter = account.balance;
    const transactionPayload = {
      transactionType: TransactionType.CREDIT,
      status: Status.SUCCESS,
      action: Action.FUND,
      userId: String(user.id),
      amount,
      balanceBefore,
      balanceAfter,
      metadata: {},
      account,
    };

    const createTransaction =
      await this.transactionRepository.save(transactionPayload);
    return createTransaction;
  }

  async withdraw(fund: Fund) {
    const userId = fund.userId;
    const amount = fund.amount;

    const user = await this.userService.getUser(userId);

    if (!user) {
      throw new BadRequestException(USER_NOT_FOUND);
    }
    const accountBalance = user.account.balance;

    if (Number(amount) > Number(accountBalance)) {
      throw new BadRequestException(INSUFFICIENT_ACCOUNT);
    }
    const accountId = user.account.id;
    const balanceBefore = user.account.balance;

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
      metadata: {},
      account,
    };

    const withdraw = await this.transactionRepository.save(transactionPayload);
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

    const receiverAccountBalanceBeforeTransfer = receiver.account.balance;
    // check user has enough to transfer
    const userAccountBalanceBeforeTransfer = user.account.balance;

    const userAccountId = user.account.id;

    if (Number(userAccountBalanceBeforeTransfer) < Number(amount)) {
      throw new BadRequestException(INSUFFICIENT_ACCOUNT);
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      //debit user account
      const debitAccountPayload = {
        accountId: userAccountId,
        amount,
      };
      await this.accountService.debitAccount(debitAccountPayload);

      //credit receiver account
      const creditAccountPayload = {
        accountId: receiverId,
        amount,
      };
      await this.accountService.creditAccount(creditAccountPayload);

      //get user balance after debit
      const userAccountAfterDebit =
        await this.accountService.getAccount(userAccountId);
      const userAccountBalanceAfterDebit = userAccountAfterDebit.balance;

      //get receiver balance after credit
      const receiverAccountAfterCredit =
        await this.accountService.getAccount(receiverId);
      const receiverAccountBalanceAfterCredit =
        receiverAccountAfterCredit.balance;

      //user transaction payload
      const debit = {
        transactionType: TransactionType.DEBIT,
        status: Status.SUCCESS,
        action: Action.TRANSFER,
        userId: String(user.id),
        amount,
        balanceBefore: userAccountBalanceBeforeTransfer,
        balanceAfter: userAccountBalanceAfterDebit,
        metadata: {},
        account: userAccountAfterDebit,
      };

      //receiver transaction payload
      const credit = {
        transactionType: TransactionType.CREDIT,
        status: Status.SUCCESS,
        action: Action.TRANSFER,
        userId: String(receiver.id),
        amount,
        balanceBefore: receiverAccountBalanceBeforeTransfer,
        balanceAfter: receiverAccountBalanceAfterCredit,
        metadata: {},
        account: receiverAccountAfterCredit,
      };

      const debitTransaction = await this.transactionRepository.save(debit);
      await this.transactionRepository.save(credit);

      await queryRunner.commitTransaction();

      return debitTransaction;
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }

  async getTransactionsByUserId(userId: string) {
    const transactions = await this.transactionRepository.find({
      where: {
        userId,
      },
    });

    return transactions;
  }
}
