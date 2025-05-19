import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { UserData } from './auth/common/decorators/user.decorator';
import { User } from './auth/entities/user.entity';
import { AuthenticatedGuard } from './auth/guards/auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(AuthenticatedGuard)
  @Get('summary')
  getSummary(@UserData() user: User) {
    return this.appService.getSummary(user);
  }
}
