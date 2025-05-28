import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Env } from 'src/utils/enums';

export async function DatabaseConfigFactory(
  config: ConfigService,
): Promise<TypeOrmModuleOptions> {
  return {
    type: 'postgres',
    url: config.get('DATABASE_URL'),
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: config.get('NODE_ENV') !== Env.PRODUCTION,
    logging: config.get('NODE_ENV') !== Env.PRODUCTION,
    dropSchema: config.get('NODE_ENV') === Env.TEST,
  };
}
