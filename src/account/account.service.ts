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

  async createAccount(account: any) {
    const createAccount = await this.accountRepository.save(account);
    return createAccount;
  }
}
