import { Test, TestingModule } from '@nestjs/testing';
import { PaymentPlanController } from './payment-plan.controller';
import { PaymentPlanService } from './payment-plan.service';

describe('PaymentPlanController', () => {
  let controller: PaymentPlanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentPlanController],
      providers: [PaymentPlanService],
    }).compile();

    controller = module.get<PaymentPlanController>(PaymentPlanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
