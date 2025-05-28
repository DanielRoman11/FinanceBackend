import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TransactionModule } from './transaction/transaction.module';
import { CategoriesModule } from './categories/categories.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { PaymentPlanModule } from './payment-plan/payment-plan.module';
import { ScriptModule } from './scripts/scripts.module';
import { LoggerModule } from 'nestjs-pino';
import {
  PinoConfigFactory,
  DatabaseConfigFactory,
  ConfigModuleOptions,
} from './config/index';

@Module({
  imports: [
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: PinoConfigFactory,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: DatabaseConfigFactory,
    }),
    ConfigModule.forRoot(ConfigModuleOptions()),
    PassportModule.register({ session: true }),
    ScriptModule,
    TransactionModule,
    CategoriesModule,
    AuthModule,
    PaymentPlanModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
