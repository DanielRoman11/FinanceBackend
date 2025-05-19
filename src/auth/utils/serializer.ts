import { PassportSerializer } from '@nestjs/passport';
import { User } from '../entities/user.entity';
import { UserService } from '../user.service';
import { Injectable } from '@nestjs/common';
import { VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private userService: UserService) {
    super();
  }

  serializeUser(user: User, done: VerifyCallback) {
    done(null, user);
  }
  async deserializeUser(payload: User, done: VerifyCallback) {
    const user = await this.userService.findUserById(payload.id);
    return user ? done(null, user) : done(null, null);
  }
}
