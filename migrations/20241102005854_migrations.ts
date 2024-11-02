import type { Knex } from 'knex';
import { Action, Status, TransactionType } from '../src/enum/enums';

export async function up(knex: Knex) {
  return knex.schema
    .createTable('users', function (table) {
      table.increments('id').primary();
      table.string('firstName').notNullable();
      table.string('lastName').notNullable();
      table.string('email').notNullable();
      table.string('password').notNullable();
      table.timestamp('createdAt').defaultTo(knex.fn.now());
      table.timestamp('updatedAt').defaultTo(knex.fn.now());
    })
    .createTable('accounts', function (table) {
      table.increments('id').primary();
      table.decimal('balance').notNullable().defaultTo(0);
      // 1v1 user and account
      table
        .integer('userId')
        .unsigned()
        .unique()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE');
      table.timestamp('createdAt').defaultTo(knex.fn.now());
      table.timestamp('updatedAt').defaultTo(knex.fn.now());
    })
    .createTable('transactions', function (table) {
      table.increments('id').primary();
      table
        .enu('transactionType', [TransactionType.CREDIT, TransactionType.DEBIT])
        .notNullable();
      table
        .enu('status', [Status.FAILED, Status.PENDING, Status.SUCCESS])
        .notNullable();
      table
        .enu('action', [Action.FUND, Action.TRANSFER, Action.WITHDRAW])
        .notNullable();
      // 1 v many user and transactions
      table
        .integer('userId')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE');
      table.decimal('amount').notNullable();
      table.decimal('balanceBefore').notNullable();
      table.decimal('balanceAfter').notNullable();
      table.uuid('referenceId').defaultTo(knex.raw('(UUID())'));
      table.timestamp('createdAt').defaultTo(knex.fn.now());
      table.timestamp('updatedAt').defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex) {
  return knex.schema
    .dropTable('transactions')
    .dropTable('accounts')
    .dropTable('users');
}
