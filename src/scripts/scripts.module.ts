import { Module } from '@nestjs/common';
import { ScriptsCommand } from './scripts.service';

@Module({
  providers: [ScriptsCommand],
})
export class ScriptModule {}
