import { ConfigService } from '@nestjs/config';

export function CORS_CONFIG(config: ConfigService) {
  return {
    origin: [
      config.get('NODE_ENV') === 'production'
        ? config.get('BACKEND_URL')
        : 'http://localhost:3000',
    ],
    credentials: true,
  };
}
