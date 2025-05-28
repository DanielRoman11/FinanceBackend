import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export async function DatabaseConfigFactory(
  config: ConfigService,
): Promise<TypeOrmModuleOptions> {
  return {
    type: 'postgres',
    url: config.get('DATABASE_URL'),
    entities: [process.cwd() + '/**/*.entity{.ts,.js}'],
    synchronize: config.get('NODE_ENV') !== 'production',
    logging: config.get('NODE_ENV') === 'development',
  };
}
