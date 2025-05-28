import { ConfigModuleOptions } from '@nestjs/config';
import * as Joi from 'joi';

export function ConfigModuleOptions(): ConfigModuleOptions<
  Record<string, any>
> {
  return {
    isGlobal: true,
    envFilePath: ['.env'],
		expandVariables: true,
    validationSchema: Joi.object({
      //? -- API --
      DATABASE_URL: Joi.string().required(),
      DATABASE_URL_PROD: Joi.string(),
      PORT: Joi.number().default(3000),
      SESSION_SECRET: Joi.string().required(),
      BACKEND_URL: Joi.string().required(),
      //? -- GOOGLE OAUTH --
      GOOGLE_CLIENT_ID: Joi.string().required(),
      GOOGLE_SECRET_ID: Joi.string().required(),
      GOOGLE_REDIRECT_URL: Joi.string().required(),
    }),
  };
}
