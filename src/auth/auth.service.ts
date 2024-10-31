import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { Login } from '../interfaces/user.interface';
import { INCORRECT_CREDENTIALS } from '../constant/constants';
import { compareHash } from '../utils/hash';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signup(user: any) {
    const signup = await this.userService.createUser(user);
    delete signup.password;
    return signup;
  }

  async login(login: Login) {
    const { email, password } = login;
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException(INCORRECT_CREDENTIALS);
    }
    const hashPayload = {
      password,
      hash: user.password,
    };

    const comparePassword = await compareHash(hashPayload);

    if (!comparePassword) {
      throw new UnauthorizedException(INCORRECT_CREDENTIALS);
    }
    delete user.password;

    return user;
  }
}
