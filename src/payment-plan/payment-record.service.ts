import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentRecord } from './entities/payment-record.entity';
import { Repository } from 'typeorm';
import { CreatePaymentRecordDto } from './dto/create-payment-record.dto';
import { User } from '../auth/entities/user.entity';

@Injectable()
export class PaymentRecordService {
  constructor(
    @InjectRepository(PaymentRecord)
    private paymentRecordRepo: Repository<PaymentRecord>,
  ) {}

  async create(
    dto: CreatePaymentRecordDto,
    user: User,
  ): Promise<PaymentRecord> {
    return await this.paymentRecordRepo.save({ ...dto, user });
  }
}
