import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { AuthService } from '../auth.service';
import { validateOrReject } from 'class-validator';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      clientID: configService.get('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get('GOOGLE_SECRET_ID'),
      callbackURL: configService.get('GOOGLE_REDIRECT_URL'),
      scope: ['profile', 'email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
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
