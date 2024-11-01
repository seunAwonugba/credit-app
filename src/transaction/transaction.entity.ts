import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Generated,
} from 'typeorm';
import { Action, Status, TransactionType } from '../enum/enums';
import { Account } from '../account/account.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: TransactionType,
  })
  transactionType: TransactionType;

  @Column({
    type: 'enum',
    enum: Status,
  })
  status: Status;

  @Column({
    type: 'enum',
    enum: Action,
  })
  action: Action;

  @Column()
  userId: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  amount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  balanceBefore: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  balanceAfter: number;

  @Generated('uuid')
  referenceId: number;

  @Column({ type: 'json', nullable: true })
  metadata: JSON;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Account, (account) => account.transactions)
  account: Account;
}
