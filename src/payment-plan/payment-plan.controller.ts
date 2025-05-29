import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PaymentPlanService } from './payment-plan.service';
import { CreatePaymentPlanDto } from './dto/create-payment-plan.dto';
import { UpdatePaymentPlanDto } from './dto/update-payment-plan.dto';
import { UserData } from '../auth/common/decorators/user.decorator';
import { User } from '../auth/entities/user.entity';
import { AuthenticatedGuard } from '../auth/guards/auth.guard';

@Controller('payment-plan')
export class PaymentPlanController {
  constructor(private readonly paymentPlanService: PaymentPlanService) {}

  @Post()
  @UseGuards(AuthenticatedGuard)
  create(
    @Body() createPaymentPlanDto: CreatePaymentPlanDto,
    @UserData() user: User,
  ) {
    return this.paymentPlanService.create(createPaymentPlanDto, user);
  }

  @Get()
  @UseGuards(AuthenticatedGuard)
  findAll(@UserData() user: User) {
    return this.paymentPlanService.findAll(user);
  }

  @Get(':id')
  @UseGuards(AuthenticatedGuard)
  findOne(@Param('id') id: string, @UserData() user: User) {
    return this.paymentPlanService.findOne(id, user);
  }

  @Patch(':id')
  @UseGuards(AuthenticatedGuard)
  update(
    @Param('id') id: string,
    @Body() updatePaymentPlanDto: UpdatePaymentPlanDto,
    @UserData() user: User,
  ) {
    return this.paymentPlanService.update(id, updatePaymentPlanDto, user);
  }

  @Delete(':id')
  @UseGuards(AuthenticatedGuard)
  remove(@Param('id') id: string, @UserData() user: User) {
    return this.paymentPlanService.remove(id, user);
  }

  @Post('/:id/invite')
  @UseGuards(AuthenticatedGuard)
  inviteCollaborator(
    @UserData() user: User,
    @Body('emails') emails: string[],
    @Param('id') id: string,
  ) {
    return this.paymentPlanService.inviteCollaborator(user);
  }
}
