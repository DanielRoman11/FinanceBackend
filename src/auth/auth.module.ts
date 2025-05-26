import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { GoogleStrategy } from './utils/google.strategy';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { SessionSerializer } from './utils/serializer';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [GoogleStrategy, AuthService, UserService, SessionSerializer],
  exports: [UserService],
})
export class AuthModule {}
