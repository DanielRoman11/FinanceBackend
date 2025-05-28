import { ValidationPipe } from '@nestjs/common';

export const GLOBAL_PIPES = new ValidationPipe({
  whitelist: true,
  transform: true,
  forbidNonWhitelisted: true,
});
