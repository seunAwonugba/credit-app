import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { AUTH_PREFIX, SIGN_UP_URL } from '../constant/constants';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';

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
}
