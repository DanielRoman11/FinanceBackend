import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { GoogleOauthGuard } from './guards/google.guard';
import { UserData } from './common/decorators/user.decorator';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}
  @Get('google/login')
  @UseGuards(GoogleOauthGuard)
  handleLogin() {}

  @Get('google/redirect')
  @UseGuards(GoogleOauthGuard)
  handleRedirect() {
    return { msg: 'OK' };
  }

  @Get('status')
  userAuthenticated(@UserData() user: User) {
    return user ? { msg: 'Authenticated' } : { msg: 'Not Authenticated' };
  }

  @Get('user')
  getUser(@Query('email') email: string) {
    return this.userService.findUserByEmail(email);
  }
}
