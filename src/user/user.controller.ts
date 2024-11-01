import {
  BadRequestException,
  Controller,
  Get,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { USER_NOT_FOUND, USER_PREFIX } from '../constant/constants';
import { UserService } from './user.service';

@Controller(USER_PREFIX)
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  async getUser(@Param('id') id: string) {
    const user = await this.userService.getUser(Number(id));
    if (!user) {
      throw new BadRequestException(USER_NOT_FOUND);
    }
    delete user.password;

    return {
      statusCode: HttpStatus.OK,
      data: user,
      message: HttpStatus.OK,
    };
  }
}
