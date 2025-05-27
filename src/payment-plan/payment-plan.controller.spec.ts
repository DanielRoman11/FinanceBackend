import { Test, TestingModule } from '@nestjs/testing';
import { PaymentPlanController } from './payment-plan.controller';
import { PaymentPlanService } from './payment-plan.service';
import { Currency, PaymentInterval, PaymentPlanStatus } from '../utils/enums';
import { CreatePaymentPlanDto } from './dto/create-payment-plan.dto';
import { User } from '../auth/entities/user.entity';
import { PaymentPlan } from './entities/payment-plan.entity';

describe('PaymentPlanController', () => {
  let controller: PaymentPlanController;
  let service: PaymentPlanService;
  let mockUser: User;
	let mockResult: PaymentPlan;

  beforeEach(async () => {
    const mockService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentPlanController],
      providers: [
        PaymentPlanService,
        {
          provide: PaymentPlanService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<PaymentPlanController>(PaymentPlanController);
    service = module.get<PaymentPlanService>(PaymentPlanService);
		mockUser = {
			id: 'afdb2c8d-dc32-4742-b8d1-2435110dde52',
			username: 'test-user',
			email: 'test@test.com',
			picture: 'test-picture',
			createdAt: new Date(),
		}
		mockResult = {
      id: 'ad2c8d-dc32-4742-b8d1-2435110dde52',
      name: 'Test',
      totalAmount: 1000,
      createdAt: new Date(),
      owner: mockUser,
      status: PaymentPlanStatus.ACTIVE,
      collaborators: [],
      startDate: new Date(),
      endDate: new Date(),
      currency: Currency.COP,
      paymentRecords: [],
      interval: PaymentInterval.WEEKLY,
    };
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Create', () => {
    it('should create a new payment plan', async () => {
      const mockDto: CreatePaymentPlanDto = {
        name: 'Test',
        totalAmount: 10000000,
        currency: Currency.COP,
        interval: PaymentInterval.WEEKLY,
        status: PaymentPlanStatus.ACTIVE,
        startDate: '2025-05-11T00:00:00.000Z',
        endDate: '2025-05-11T00:00:00.000Z',
        participantIds: [],
      };

      const result = await service.create(mockDto, mockUser);

      expect(result).toEqual(mockResult);
      expect(service.create).toHaveBeenCalledTimes(1);
    });
  });
});
