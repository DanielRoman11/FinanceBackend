import { Controller, Get, UseGuards } from '@nestjs/common';
import { GoogleOauthGuard } from './guards/google.guard';

@Controller('auth')
export class AuthController {
  @Get('google/login')
  @UseGuards(GoogleOauthGuard)
  handleLogin() {}

  @Get('google/redirect')
  @UseGuards(GoogleOauthGuard)
  handleRedirect() {
    return { msg: 'OK' };
  }
}
