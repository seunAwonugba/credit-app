import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { NetworkModule } from '../network/network.module';

@Module({
  imports: [UserModule, NetworkModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
