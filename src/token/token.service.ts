import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async generateAuthenticationTokens(payload: any) {
    const accessTokenKey = this.configService.get<string>(
      'token.accessTokenKey',
    );

    const refreshTokenKey = this.configService.get<string>(
      'token.refreshTokenKey',
    );

    const accessTokenEx = this.configService.get<string>('token.accessTokenEx');

    const refreshTokenEx = this.configService.get<string>(
      'token.refreshTokenEx',
    );

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: accessTokenKey,
        expiresIn: accessTokenEx,
      }),
      this.jwtService.signAsync(payload, {
        secret: refreshTokenKey,
        expiresIn: refreshTokenEx,
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }
}
