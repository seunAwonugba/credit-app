import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { AUTH_PREFIX, LOGIN_IN_URL, SIGN_UP_URL } from '../constant/constants';
import { AuthService } from './auth.service';
import { LoginDto, SignUpDto } from './dto/auth.dto';

@Controller(AUTH_PREFIX)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post(SIGN_UP_URL)
  async signup(@Body() signupDto: SignUpDto) {
    const signup = await this.authService.signup(signupDto);

    return {
      statusCode: HttpStatus.CREATED,
      data: signup,
      message: HttpStatus.CREATED,
    };
  }

  @Post(LOGIN_IN_URL)
  async login(@Body() loginDto: LoginDto) {
    const login = await this.authService.login(loginDto);

    return {
      statusCode: HttpStatus.OK,
      data: login,
      message: HttpStatus.OK,
    };
  }
}
