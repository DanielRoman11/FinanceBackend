import { Test, TestingModule } from '@nestjs/testing';
import { PaymentPlanController } from './payment-plan.controller';
import { PaymentPlanService } from './payment-plan.service';
import { Currency, PaymentInterval, PaymentPlanStatus } from '../utils/enums';
import { CreatePaymentPlanDto } from './dto/create-payment-plan.dto';
import { User } from '../auth/entities/user.entity';
import { PaymentPlan } from './entities/payment-plan.entity';
import { UpdatePaymentPlanDto } from './dto/update-payment-plan.dto';

describe('PaymentPlanController', () => {
  let controller: PaymentPlanController;
  let service: PaymentPlanService;
  let mockUser: User;
  let otherUser: User;
  let mockResult: PaymentPlan;

  beforeEach(async () => {
    const mockServiceFunctions = {
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
          useValue: mockServiceFunctions,
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
    };
    otherUser = {
      id: 'otherId',
      username: 'test-user',
      email: 'test@test.com',
      picture: 'test-picture',
      createdAt: new Date(),
    };
    mockResult = {
      id: 'ad2c8d-dc32-4742-b8d1-2435110dde52',
      name: 'Test',
      totalAmount: 1000,
      createdAt: new Date(),
      owner: mockUser,
      status: PaymentPlanStatus.ACTIVE,
      collaborators: [otherUser],
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
        ownerId: mockUser.id,
        totalAmount: 10000000,
        currency: Currency.COP,
        interval: PaymentInterval.WEEKLY,
        status: PaymentPlanStatus.ACTIVE,
        startDate: '2025-05-11T00:00:00.000Z',
        endDate: '2025-05-11T00:00:00.000Z',
        participantIds: [otherUser.id],
      };

      jest.spyOn(service, 'create').mockResolvedValue(mockResult);

      const result = await service.create(mockDto, mockUser);

      expect(result).toEqual(mockResult);
      expect(service.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it('should return all payment plans from a single user', async () => {
      const mockResultArray: PaymentPlan[] = [mockResult];

      jest.spyOn(service, 'findAll').mockResolvedValue(mockResultArray);

      const result = await controller.findAll(mockUser);

      expect(result).toEqual(mockResultArray);
      expect(service.findAll).toHaveBeenCalledTimes(1);
      expect(service.findAll).toHaveBeenCalledWith(mockUser);
    });
  });

  describe('findOne', () => {
    it('should return a payment plan from a single user', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(mockResult);

      const result = await controller.findOne('1', mockUser);

      expect(result).toEqual(mockResult);
      expect(service.findOne).toHaveBeenCalledTimes(1);
      expect(service.findOne).toHaveBeenCalledWith('1', mockUser);
    });
  });

  describe('Update', () => {
    let dto: UpdatePaymentPlanDto;
    let mockInitial: PaymentPlan;

    beforeEach(() => {
      jest.clearAllMocks();
      dto = {
        name: 'Test',
        totalAmount: 10000000,
        currency: Currency.COP,
        interval: PaymentInterval.WEEKLY,
        status: PaymentPlanStatus.ACTIVE,
        startDate: '2025-05-11T00:00:00.000Z',
        endDate: '2025-05-11T00:00:00.000Z',
        participantIds: [otherUser.id],
      };
      mockInitial = {
        id: mockResult.id,
        createdAt: new Date(),
        owner: mockUser,
        name: 'Before',
        totalAmount: 10000000,
        currency: Currency.COP,
        interval: PaymentInterval.WEEKLY,
        status: PaymentPlanStatus.ACTIVE,
        startDate: new Date(),
        endDate: new Date(),
        collaborators: [],
        paymentRecords: [],
      };
    });

    it('should update a payment plan', async () => {
      jest.spyOn(service, 'update').mockResolvedValue(mockResult);

      const result = await controller.update('1', dto, mockUser);

      expect(result).toEqual(mockResult);
      expect(service.update).toHaveBeenCalledTimes(1);
      expect(service.update).toHaveBeenCalledWith('1', dto, mockUser);
    });
  });
});
