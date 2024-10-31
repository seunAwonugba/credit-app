import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { Account } from './account.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Account])],
  providers: [AccountService],
  controllers: [AccountController],
  exports: [TypeOrmModule, AccountService],
})
export class AccountModule {}
