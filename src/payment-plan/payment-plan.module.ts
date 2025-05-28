import { Module } from '@nestjs/common';
import { PaymentPlanService } from './payment-plan.service';
import { PaymentPlanController } from './payment-plan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentPlan } from './entities/payment-plan.entity';
import { PaymentRecord } from './entities/payment-record.entity';
import { PaymentRecordController } from './payment-record.controller';
import { PaymentRecordService } from './payment-record.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentPlan, PaymentRecord]), AuthModule],
  controllers: [PaymentPlanController, PaymentRecordController],
  providers: [PaymentPlanService, PaymentRecordService],
})
export class PaymentPlanModule {}
