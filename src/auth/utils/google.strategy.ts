import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { CreateUserDto } from '../dto/create-user.dto';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly config: ConfigService,
    private authService: AuthService,
  ) {
    super({
      clientID: config.get('GOOGLE_CLIENT_ID'),
      clientSecret: config.get('GOOGLE_SECRET_ID'),
      callbackURL:
        config.get('GOOGLE_REDIRECT_URL') ??
        'http://localhost:3000/api/auth/google/redirect',
      scope: ['profile', 'email'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    _done: VerifyCallback,
  ): Promise<any> {
    const userDto: CreateUserDto = {
      email: profile.emails[0].value,
      username: profile.displayName,
      picture: profile.photos[0].value,
    };

    const user = await this.authService.validateUser(userDto);
    return user || null;
  }
}
