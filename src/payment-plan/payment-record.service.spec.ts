import { Repository } from 'typeorm';
import { PaymentRecord } from './entities/payment-record.entity';
import { PaymentRecordService } from './payment-record.service';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../auth/entities/user.entity';
import { PaymentPlan } from './entities/payment-plan.entity';
import {
  Currency,
  PaymentInterval,
  PaymentPlanStatus,
  PaymentStatus,
} from '../utils/enums';
import { CreatePaymentRecordDto } from './dto/create-payment-record.dto';

describe('PaymentRecordService', () => {
  let service: PaymentRecordService;
  let repo: Repository<PaymentRecord>;
  let mockUser: User;
  let mockPaymentPlan: PaymentPlan;
  let mockResult: PaymentRecord;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        PaymentRecordService,
        {
          provide: getRepositoryToken(PaymentRecord),
          useValue: {
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PaymentRecordService>(PaymentRecordService);
    repo = module.get<Repository<PaymentRecord>>(
      getRepositoryToken(PaymentRecord),
    );
    mockUser = {
      id: 'afdb2c8d-dc32-4742-b8d1-2435110dde52',
      username: 'test-user',
      email: 'test@test.com',
      picture: 'test-picture',
      createdAt: new Date(),
    };
    mockPaymentPlan = {
      id: 'ad2c8d-dc32-4742-b8d1-2435110dde52',
      name: 'Test',
      totalAmount: 1000,
      createdAt: new Date(),
      owner: mockUser,
      status: PaymentPlanStatus.ACTIVE,
      collaborators: [] as User[],
      startDate: new Date(),
      endDate: new Date(),
      currency: Currency.USD,
      paymentRecords: [] as PaymentRecord[],
      interval: PaymentInterval.WEEKLY,
    };
    mockResult = {
      id: 'ad2c8d-dc32-4742-b8d1-2435110dde52',
      amount: 1000,
      paymentDate: new Date(),
      status: PaymentStatus.PENDING,
      user: mockUser,
      plan: mockPaymentPlan,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new payment record', async () => {
      const dto: CreatePaymentRecordDto = {
        amount: 1000,
        paymentDate: '2025-05-11T00:00:00.000Z',
        status: PaymentStatus.PENDING,
        planId: mockPaymentPlan.id,
      };

      jest.spyOn(repo, 'save').mockResolvedValue(mockResult);

      const result = await service.create(dto, mockUser);

      expect(result).toEqual(mockResult);
      expect(repo.save).toHaveBeenCalledTimes(1);
    });
  });
});
