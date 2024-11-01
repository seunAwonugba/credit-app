import { Injectable } from '@nestjs/common';
import { Account } from './account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {}

  async createAccount() {
    const createAccount = await this.accountRepository.save({ balance: 0 });
    return createAccount;
  }

  async getAccount(id: number) {
    const account = this.accountRepository.findOne({
      where: {
        id,
      },
    });
    return account;
  }

  async creditAccount(payload: any) {
    const accountId = payload.accountId;
    const amount = payload.amount;

    const credit = this.accountRepository.increment(
      { id: accountId },
      'balance',
      amount,
    );
    return credit;
  }

  async debitAccount(payload: any) {
    const accountId = payload.accountId;
    const amount = payload.amount;

    const debit = this.accountRepository.decrement(
      { id: accountId },
      'balance',
      amount,
    );
    return debit;
  }
}
