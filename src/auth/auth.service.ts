import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signup(user: any) {
    const signup = await this.userService.createUser(user);
    delete signup.password;
    return signup;
  }
}
