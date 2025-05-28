import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { PaymentRecordService } from './payment-record.service';
import { CreatePaymentRecordDto } from './dto/create-payment-record.dto';
import { AuthenticatedGuard } from '../auth/guards/auth.guard';
import { UserData } from '../auth/common/decorators/user.decorator';
import { User } from '../auth/entities/user.entity';

@Controller('payment-record')
export class PaymentRecordController {
  constructor(private readonly paymentRecordService: PaymentRecordService) {}

  @Post()
  @UseGuards(AuthenticatedGuard)
  create(@Body() dto: CreatePaymentRecordDto, @UserData() user: User) {
    return this.paymentRecordService.create(dto, user);
  }
}
