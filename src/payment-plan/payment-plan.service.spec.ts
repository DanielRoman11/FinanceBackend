import { Test, TestingModule } from '@nestjs/testing';
import { PaymentPlanService } from './payment-plan.service';
import { PaymentPlan } from './entities/payment-plan.entity';
import { User } from '../auth/entities/user.entity';
import { Currency, PaymentPlanStatus, PaymentInterval } from '../utils/enums';
import { CreatePaymentPlanDto } from './dto/create-payment-plan.dto';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('PaymentPlanService', () => {
  let service: PaymentPlanService;
  let repo: Repository<PaymentPlan>;
  let mockUser: User;
  let mockResult: PaymentPlan;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentPlanService,
        {
          provide: getRepositoryToken(PaymentPlan),
          useValue: {
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PaymentPlanService>(PaymentPlanService);
    repo = module.get<Repository<PaymentPlan>>(getRepositoryToken(PaymentPlan));
    mockUser = {
      id: 'afdb2c8d-dc32-4742-b8d1-2435110dde52',
      username: 'test-user',
      email: 'test@test.com',
      picture: 'test-picture',
      createdAt: new Date(),
    };
    mockResult = {
      id: 'ad2c8d-dc32-4742-b8d1-2435110dde52',
      name: 'Test',
      totalAmount: 10000000,
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
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should return a new instance of PaymentPlan', async () => {
      const dto: CreatePaymentPlanDto = {
        name: 'Test',
        totalAmount: 10000000,
        currency: Currency.COP,
        interval: PaymentInterval.WEEKLY,
        status: PaymentPlanStatus.ACTIVE,
        startDate: '2025-05-11T00:00:00.000Z',
        endDate: '2025-05-11T00:00:00.000Z',
        participantIds: [],
      };

      const result = await service.create(dto, mockUser);

      expect(result).toEqual(mockResult);
      expect(repo.save).toHaveBeenCalledTimes(1);
    });
  });
});
