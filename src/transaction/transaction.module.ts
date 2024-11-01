import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './transaction.entity';
import { UserModule } from '../user/user.module';
import { AccountModule } from '../account/account.module';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction]), UserModule, AccountModule],
  providers: [TransactionService],
  controllers: [TransactionController],
  exports: [TypeOrmModule, TransactionService],
})
export class TransactionModule {}
