import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { useContainer } from 'class-validator';
import * as session from 'express-session';
import * as passport from 'passport';
import { GLOBAL_PIPES, SESSION_CONFIG } from './utils/contants';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useLogger(app.get(Logger));
  app.useGlobalPipes(GLOBAL_PIPES);
  app.use(session(SESSION_CONFIG));
  app.use(passport.initialize());
  app.use(passport.session());
  app.setGlobalPrefix('api');
  app.enableCors();
  const port = process.env.PORT ?? 3000;
  await app.listen(port, '0.0.0.0', () => {
    console.log('Listening on port', port);
  });
}
bootstrap();
