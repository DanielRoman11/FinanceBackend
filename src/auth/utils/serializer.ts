import { PassportSerializer } from '@nestjs/passport';
import { User } from '../entities/user.entity';
import { UserService } from '../user.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private userService: UserService) {
    super();
  }

  serializeUser(user: User, done: Function) {
    done(null, user);
  }
  async deserializeUser(payload: User, done: Function) {
    const user = await this.userService.findUserById(payload.id);
    return user ? done(null, user) : done(null, null);
  }
}
