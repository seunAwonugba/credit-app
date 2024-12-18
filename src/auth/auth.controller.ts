import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { ReasonPhrases } from 'http-status-codes';
import {
  AUTH_PREFIX,
  LOGIN_URL,
  LOGOUT_URL,
  SIGN_UP_URL,
} from '../constant/constants';
import { AuthService } from './auth.service';
import { LoginDto, SignUpDto } from './dto/auth.dto';
import { Public } from '../utils/skip-auth';

@Controller(AUTH_PREFIX)
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * A user can create an account
   */
  @Public()
  @Post(SIGN_UP_URL)
  async signup(@Body() signupDto: SignUpDto) {
    const signup = await this.authService.signup(signupDto);

    return {
      statusCode: HttpStatus.CREATED,
      data: signup,
      message: ReasonPhrases.CREATED,
    };
  }

  /**
   * A user can login
   */
  @Public()
  @Post(LOGIN_URL)
  async login(@Body() loginDto: LoginDto) {
    const login = await this.authService.login(loginDto);

    return {
      statusCode: HttpStatus.OK,
      data: login,
      message: ReasonPhrases.OK,
    };
  }

  /**
   * A user can logout
   */
  @Public()
  @Get(LOGOUT_URL)
  async logout() {
    return {
      success: true,
      message: 'Successfully logged out 😏 🍀',
      data: {
        accessToken: '',
        refreshToken: '',
      },
    };
  }
}
