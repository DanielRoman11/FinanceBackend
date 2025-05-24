import { ValidationPipe } from '@nestjs/common';
import session from 'express-session';

export const SESSION_CONFIG = {
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    httpOnly: true,
  },
} as session.SessionOptions;

export const GLOBAL_PIPES = new ValidationPipe({
  whitelist: true,
  transform: true,
  forbidNonWhitelisted: true,
});

export const CORS_CONFIG = {
  origin: [
    process.env.NODE_ENV === 'production'
      ? process.env.BACKEND_URL
      : 'http://localhost:3000',
  ],
  credentials: true,
};
