import { Module } from '@nestjs/common';
import { PaymentPlanService } from './payment-plan.service';
import { PaymentPlanController } from './payment-plan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentPlan } from './entities/payment-plan.entity';
import { PaymentRecord } from './entities/payment-record.entity';
import { PaymentRecordController } from './payment-record.controller';
import { PaymentRecordService } from './payment-record.service';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentPlan, PaymentRecord])],
  controllers: [PaymentPlanController, PaymentRecordController],
  providers: [PaymentPlanService, PaymentRecordService],
})
export class PaymentPlanModule {}
