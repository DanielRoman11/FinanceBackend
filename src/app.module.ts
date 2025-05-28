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
import * as Joi from 'joi';
import { ScriptModule } from './scripts/scripts.module';

@Module({
  imports: [
    ScriptModule,
    PassportModule.register({ session: true }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      validationSchema: Joi.object({
        //? -- API --
        DATABASE_URL: Joi.string().required(),
        DATABASE_URL_PROD: Joi.string(),
        PORT: Joi.number().default(3000),
        SESSION_SECRET: Joi.string().required(),
        BACKEND_URL: Joi.string().required(),
        //? -- GOOGLE OAUTH --
        GOOGLE_CLIENT_ID: Joi.string().required(),
        GOOGLE_SECRET_ID: Joi.string().required(),
        GOOGLE_REDIRECT_URL: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        console.log(configService.get('DATABASE_URL'));
        return {
          type: 'postgres',
          url: configService.get('DATABASE_URL'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: configService.get('NODE_ENV') !== 'production',
          logging: true,
        };
      },
    }),
    TransactionModule,
    CategoriesModule,
    AuthModule,
    PaymentPlanModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
