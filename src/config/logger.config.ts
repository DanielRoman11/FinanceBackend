import { ConfigService } from '@nestjs/config';
import { Params } from 'nestjs-pino';

export function PinoConfigFactory(config: ConfigService): Params {
  return {
    pinoHttp: {
			level: "debug",
      transport:
        config.get('NODE_ENV') !== 'production'
          ? {
              target: 'pino-pretty',
              options: {
                colorize: true,
                translateTime: 'yyyy-mm-dd HH:MM:ss.l o',
                ignore: 'pid,hostname',
                singleLine: false,
              },
            }
          : undefined,
      serializers: {
        err: (err) => ({
          type: err.type,
          message: err.message,
          stack: err.stack,
          ...err,
        }),
      },
    },
  };
}
