import { ConfigService } from '@nestjs/config';
import session from 'express-session';

export function SESSION_CONFIG(config: ConfigService) {
  return {
    secret: config.get('SESSION_SECRET'),
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      secure: config.get('NODE_ENV') === 'production',
      sameSite: config.get('NODE_ENV') === 'production' ? 'none' : 'lax',
      httpOnly: true,
    },
  } as session.SessionOptions;
}
