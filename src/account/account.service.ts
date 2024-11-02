import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';

@Injectable()
export class AccountService {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  async createAccount(userId: number) {
    const createAccount = await this.knex.table('accounts').insert({ userId });
    return createAccount;
  }

  async getAccount(id: number) {
    const account = await this.knex
      .table('accounts')
      .select('*')
      .where('id', id)
      .first();
    return account;
  }

  async getAccountByUserId(userId: number) {
    const user = await this.knex
      .table('accounts')
      .select('*')
      .where('userId', userId)
      .first();
    return user;
  }

  async creditAccount(payload: any) {
    const accountId = payload.accountId;
    const amount = payload.amount;
    const credit = this.knex
      .table('accounts')
      .increment('balance', amount)
      .where({ id: accountId });
    return credit;
  }

  async debitAccount(payload: any) {
    const accountId = payload.accountId;
    const amount = payload.amount;
    const credit = this.knex
      .table('accounts')
      .decrement('balance', amount)
      .where({ id: accountId });
    return credit;
  }
}
