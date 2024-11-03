import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.test.local' });
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { NetworkModule } from '../network/network.module';
import { TokenModule } from '../token/token.module';
import { UserModule } from '../user/user.module';
import { AccessTokenStrategy } from '../strategies/accessToken.strategy';
import { RefreshTokenStrategy } from '../strategies/refreshToken.strategy';
import { ReasonPhrases } from 'http-status-codes';
import { ConfigModule } from '@nestjs/config';
import { HttpStatus } from '@nestjs/common';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  const userEmail = 'seunawonugba@gmail.com';
  const password = 'Chemistry500*';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UserModule,
        NetworkModule,
        TokenModule,
        ConfigModule.forRoot({ isGlobal: true }),
      ],
      providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
      controllers: [AuthController],
    }).compile();

    authService = module.get(AuthService);
    authController = module.get<AuthController>(AuthController);
  });

  describe('signup', () => {
    it('A user can create an account', async () => {
      const body = {
        firstName: 'seun',
        lastName: 'awonugba',
        email: userEmail,
        password,
        confirmPassword: password,
      };
      const result = {
        statusCode: 201,
        data: {
          id: expect.any(String),
          firstName: 'seun',
          lastName: 'awonugba',
          email: userEmail,
          createdAt: expect.any(Date), // Expect any date
          updatedAt: expect.any(Date), // Expect any date
          accessToken: expect.any(String), // Expect any string for token
          refreshToken: expect.any(String), // Expect any string for refresh token
        },
        message: ReasonPhrases.CREATED,
      };

      jest.spyOn(authService, 'signup').mockResolvedValue(result.data);

      expect(await authController.signup(body)).toEqual(result);
    });
  });

  describe('login', () => {
    it('User with an account login successful', async () => {
      const body = {
        email: userEmail,
        password,
      };
      const result = {
        statusCode: HttpStatus.OK,
        data: {
          id: expect.any(String),
          firstName: 'seun',
          lastName: 'awonugba',
          email: userEmail,
          createdAt: expect.any(Date), // Expect any date
          updatedAt: expect.any(Date), // Expect any date
          accessToken: expect.any(String), // Expect any string for token
          refreshToken: expect.any(String), // Expect any string for refresh token
        },
        message: ReasonPhrases.OK,
      };

      jest.spyOn(authService, 'login').mockResolvedValue(result.data);

      expect(await authController.login(body)).toEqual(result);
    });
  });
});
