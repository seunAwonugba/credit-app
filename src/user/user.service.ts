import { ConflictException, Injectable } from '@nestjs/common';

import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';
import { UNIQUE_EMAIL } from '../constant/constants';
import { matchingPassword } from '../utils';
import { hashData } from '../utils/hash';

@Injectable()
export class UserService {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  async createUser(payload: any) {
    const email = payload.email;
    const userExist = await this.getUserByEmail(email);

    if (userExist) {
      throw new ConflictException(UNIQUE_EMAIL);
    }
    matchingPassword(payload);
    const password = await hashData(payload.password);
    delete payload.confirmPassword;
    const userPayload = {
      ...payload,
      password,
    };
    const [id] = await this.knex.table('users').insert({ ...userPayload });
    const user = await this.getUser(id);
    const userId = user.id;

    await this.knex.table('accounts').insert({ userId, balance: 0 });

    return user;
  }

  async getUsers() {
    // const users = await this.userRepository.find();
    // return users;
  }

  async getUser(id: number) {
    const user = await this.knex
      .table('users')
      .select('*')
      .where({
        id,
      })
      .first();
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.knex
      .table('users')
      .select('*')
      .where('email', email)
      .first();
    return user;
  }
}
