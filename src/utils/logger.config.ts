import { ConfigService } from '@nestjs/config';
import { Params } from 'nestjs-pino';

export function PinoConfigFactory(config: ConfigService): Params {
  return {
    pinoHttp: {
      transport:
        config.get('NODE_ENV') !== 'production'
          ? {
              target: 'pino-pretty',
              options: {
                colorize: true,
              },
            }
          : undefined,
    },
  };
}
