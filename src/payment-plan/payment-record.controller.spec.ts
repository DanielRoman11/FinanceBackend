import { Test } from '@nestjs/testing';
import { PaymentRecordController } from './payment-record.controller';
import { PaymentRecordService } from './payment-record.service';
import {
  Currency,
  PaymentInterval,
  PaymentPlanStatus,
  PaymentStatus,
} from '../utils/enums';
import { PaymentPlan } from './entities/payment-plan.entity';
import { User } from '../auth/entities/user.entity';
import { PaymentRecord } from './entities/payment-record.entity';
import { CreatePaymentRecordDto } from './dto/create-payment-record.dto';

describe('PaymentRecordController', () => {
  let controller: PaymentRecordController;
  let service: PaymentRecordService;
  let mockUser: User;
  let mockPaymentPlan: PaymentPlan;
  let mockResult: PaymentRecord;

  const mockServiceResult = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [PaymentRecordController],
      providers: [
        PaymentRecordService,
        {
          provide: PaymentRecordService,
          useValue: mockServiceResult,
        },
      ],
    }).compile();

    controller = module.get<PaymentRecordController>(PaymentRecordController);
    service = module.get<PaymentRecordService>(PaymentRecordService);
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
    expect(true).toBeDefined();
  });

  describe('Create', () => {
    it('should create a new payment record', async () => {
      const mockDto: CreatePaymentRecordDto = {
        amount: 1000,
        paymentDate: '2025-05-11T00:00:00.000Z',
        status: PaymentStatus.PENDING,
        planId: mockPaymentPlan.id,
      };

      jest.spyOn(service, 'create').mockResolvedValue(mockResult);

      const result = await service.create(mockDto, mockUser);

      expect(result).toEqual(mockResult);
      expect(service.create).toHaveBeenCalledTimes(1);
    });
  });
});
