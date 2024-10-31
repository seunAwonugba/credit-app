import { Module } from '@nestjs/common';
import { NetworkService } from './network.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [NetworkService],
  exports: [NetworkService],
})
export class NetworkModule {}
