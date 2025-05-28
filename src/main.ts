import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { useContainer } from 'class-validator';
import * as session from 'express-session';
import * as passport from 'passport';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import { GLOBAL_PIPES } from './utils/contants';
import { SESSION_CONFIG, CORS_CONFIG } from './config/index';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const config = app.get(ConfigService);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.useGlobalPipes(GLOBAL_PIPES);
  app.use(session(SESSION_CONFIG(config)));
  app.useLogger(app.get(Logger));
  app.use(passport.initialize());
  app.use(passport.session());
  app.setGlobalPrefix('api');
  app.enableCors(CORS_CONFIG(config));
  const port = config.get('PORT') ?? 3000;
  await app.listen(port, '0.0.0.0', () => {
    console.log('Listening on port', port);
  });
}
bootstrap();
