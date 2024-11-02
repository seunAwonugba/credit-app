import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NetworkService {
  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async checkKarma(identity: string) {
    try {
      const karmaBaseUrl = this.configService.get<string>('karmaBaseUrl');
      const adjutorApiKey = this.configService.get<string>('adjutorApiKey');

      const headers = {
        Authorization: `Bearer ${adjutorApiKey}`,
      };
      const checkKarma = await this.httpService.axiosRef.get(
        `${karmaBaseUrl}/${identity}`,
        {
          headers,
        },
      );
      return checkKarma;
    } catch (error: any) {
      if (!error.response) {
        throw new InternalServerErrorException();
      }
      return error.response;
    }
  }
}
