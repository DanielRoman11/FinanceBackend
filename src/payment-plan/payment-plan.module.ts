import { Module } from '@nestjs/common';
import { PaymentPlanService } from './payment-plan.service';
import { PaymentPlanController } from './payment-plan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentPlan } from './entities/payment-plan.entity';
import { PaymentRecord } from './entities/payment-record.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentPlan, PaymentRecord])],
  controllers: [PaymentPlanController],
  providers: [PaymentPlanService],
})
export class PaymentPlanModule {}
