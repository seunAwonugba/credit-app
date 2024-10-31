import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { WalletModule } from './wallet/wallet.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { NetworkModule } from './network/network.module';
import { TokenModule } from './token/token.module';
import configuration from './config/configuration';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from './guard/accessToken.guard';

@Module({
  imports: [
    UserModule,
    AuthModule,
    WalletModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT) || 3306,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: ['dist/**/*.entity.js'],
        migrations: ['dist/**/migrations/*.js'],
        migrationsRun: true,
        autoLoadEntities: true,
        logging: true,
        // synchronize: true,
      }),
    }),
    NetworkModule,
    TokenModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
  ],
})
export class AppModule {}
