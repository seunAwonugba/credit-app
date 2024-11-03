import { Test, TestingModule } from '@nestjs/testing';
import { TransactionService } from './transaction.service';
import { AccountModule } from '../account/account.module';
import { UserModule } from '../user/user.module';
import { Action, Status, TransactionType } from '../enum/enums';
import { INSUFFICIENT_ACCOUNT } from '../constant/constants';
import { HttpStatus } from '@nestjs/common';

describe('TransactionService', () => {
  let transactionService: TransactionService;
  const amount = 1;
  const userId = 20;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule, AccountModule],
      providers: [TransactionService],
    }).compile();

    transactionService = module.get<TransactionService>(TransactionService);
  });

  describe('fund account', () => {
    it('A user can fund their account', async () => {
      const fundPayload = {
        userId,
        amount,
      };

      const result = {
        id: expect.any(String),
        transactionType: TransactionType.CREDIT,
        status: Status.SUCCESS,
        action: Action.FUND,
        userId: 5,
        amount,
        balanceBefore: expect.any(String),
        balanceAfter: expect.any(String),
        referenceId: expect.any(String),
        createdAt: expect.any(Date), // Expect any date
        updatedAt: expect.any(Date), // Expect any date
      };

      jest.spyOn(transactionService, 'fundAccount').mockResolvedValue(result);
      expect(await transactionService.fundAccount(fundPayload)).toEqual(result);
    });
  });

  describe('transfer', () => {
    it('A user can transfer funds to another users account', async () => {
      const transferPayload = {
        receiversId: userId,
        amount,
      };

      const result = {
        id: expect.any(String),
        transactionType: TransactionType.DEBIT,
        status: Status.SUCCESS,
        action: Action.TRANSFER,
        userId: 5,
        amount,
        balanceBefore: expect.any(String),
        balanceAfter: expect.any(String),
        referenceId: expect.any(String),
        createdAt: expect.any(Date), // Expect any date
        updatedAt: expect.any(Date), // Expect any date
      };

      jest.spyOn(transactionService, 'transfer').mockResolvedValue(result);
      expect(await transactionService.transfer(transferPayload)).toEqual(
        result,
      );
    });
  });

  describe('Withdraw', () => {
    it('A user can withdraw funds from their account', async () => {
      const withdrawPayload = {
        userId,
        amount,
      };

      const result = {
        id: expect.any(String),
        transactionType: TransactionType.DEBIT,
        status: Status.SUCCESS,
        action: Action.WITHDRAW,
        userId,
        amount,
        balanceBefore: expect.any(String),
        balanceAfter: expect.any(String),
        referenceId: expect.any(String),
        createdAt: expect.any(Date), // Expect any date
        updatedAt: expect.any(Date), // Expect any date
      };

      jest.spyOn(transactionService, 'withdraw').mockResolvedValue(result);
      expect(await transactionService.withdraw(withdrawPayload)).toEqual(
        result,
      );
    });

    it('should return an error if user has insufficient balance', async () => {
      const withdrawPayload = {
        userId,
        amount: 1000, // A higher amount to simulate insufficient funds
      };

      const insufficientFundsError = {
        statusCode: HttpStatus.BAD_REQUEST,
        message: INSUFFICIENT_ACCOUNT,
        action: Action.WITHDRAW,
      };

      jest
        .spyOn(transactionService, 'withdraw')
        .mockResolvedValue(insufficientFundsError);
      const result = await transactionService.withdraw(withdrawPayload);

      expect(result).toEqual(insufficientFundsError);
    });
  });
});
