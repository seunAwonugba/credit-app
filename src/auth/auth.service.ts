import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { Login } from '../interfaces/user.interface';
import {
  BLACKLIST_ACCOUNT,
  ERROR,
  INCORRECT_CREDENTIALS,
  KARMA_ID_NOT_FOUND,
} from '../constant/constants';
import { NetworkService } from '../network/network.service';
import { TokenService } from '../token/token.service';
import { compareHash } from '../utils/hash';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private networkService: NetworkService,
    private tokenService: TokenService,
  ) {}

  async signup(user: any) {
    const email = user.email;
    const checkKarma = await this.networkService.checkKarma(email);

    if (checkKarma.status >= 200 && checkKarma.status < 300) {
      throw new BadRequestException(BLACKLIST_ACCOUNT);
    }
    if (checkKarma.status >= 400 && checkKarma.status < 500) {
      const data = checkKarma.data;
      const status = data.status;
      const message = data.message;
      if (status == ERROR) {
        throw new BadRequestException(message);
      }
      if (message == KARMA_ID_NOT_FOUND) {
        const signup = await this.userService.createUser(user);
        delete signup.password;
        const authenticationTokenPayload = {
          id: signup.id,
          email: signup.email,
        };
        const authenticationTokens =
          await this.tokenService.generateAuthenticationTokens(
            authenticationTokenPayload,
          );
        return {
          ...signup,
          ...authenticationTokens,
        };
      }
      throw new BadRequestException(message);
    }
    throw new InternalServerErrorException();
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
    const authenticationTokenPayload = {
      id: user.id,
      email: user.email,
    };
    const authenticationTokens =
      await this.tokenService.generateAuthenticationTokens(
        authenticationTokenPayload,
      );
    return {
      ...user,
      ...authenticationTokens,
    };
  }
}
