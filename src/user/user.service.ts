import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { matchingPassword } from '../utils';
import { UNIQUE_EMAIL } from '../constant/constants';
import { hashData } from '../utils/hash';
import { AccountService } from '../account/account.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private accountService: AccountService,
  ) {}

  async createUser(user: any) {
    const email = user.email;
    const userExist = await this.getUserByEmail(email);
    if (userExist) {
      throw new ConflictException(UNIQUE_EMAIL);
    }
    matchingPassword(user);
    const password = await hashData(user.password);
    delete user.confirmPassword;

    const account = await this.accountService.createAccount();

    const userPayload = {
      ...user,
      password,
      account,
    };
    const createUser = await this.userRepository.save(userPayload);

    return createUser;
  }

  async getUsers(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
  }

  async getUser(id: number): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
      relations: {
        account: true,
      },
    });

    return user;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
      relations: {
        account: true,
      },
    });
    return user;
  }
}
