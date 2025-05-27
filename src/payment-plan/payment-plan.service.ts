import { Injectable, NotImplementedException } from '@nestjs/common';
import { CreatePaymentPlanDto } from './dto/create-payment-plan.dto';
import { UpdatePaymentPlanDto } from './dto/update-payment-plan.dto';
import { PaymentPlan } from './entities/payment-plan.entity';
import { User } from '../auth/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentPlanService {
  constructor(
    @InjectRepository(PaymentPlan)
    private paymentPlanRepo: Repository<PaymentPlan>,
  ) {}

  async create(
    dto: CreatePaymentPlanDto,
    currentUser: User,
  ): Promise<PaymentPlan> {
    try {
      console.log(dto);
      return await this.paymentPlanRepo.save({ ...dto, owner: currentUser });
    } catch (err) {
      console.error(err);
    }
  }

  async findAll(user: User): Promise<PaymentPlan[]> {
    throw new NotImplementedException();
  }

  async findOne(id: string): Promise<PaymentPlan> {
    throw new NotImplementedException();
  }

  async update(id: string, dto: UpdatePaymentPlanDto): Promise<PaymentPlan> {
    throw new NotImplementedException();
  }

  async remove(id: string) {
    throw new NotImplementedException();
  }
}
