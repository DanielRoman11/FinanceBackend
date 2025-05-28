import { Test, TestingModule } from '@nestjs/testing';
import { PaymentPlanService } from './payment-plan.service';
import { PaymentPlan } from './entities/payment-plan.entity';
import { User } from '../auth/entities/user.entity';
import { Currency, PaymentPlanStatus, PaymentInterval } from '../utils/enums';
import { CreatePaymentPlanDto } from './dto/create-payment-plan.dto';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UpdatePaymentPlanDto } from './dto/update-payment-plan.dto';
import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from '../auth/user.service';

describe('PaymentPlanService', () => {
  let service: PaymentPlanService;
  let userService: UserService;
  let repo: Repository<PaymentPlan>;
  let mockUser: User;
  let otherUser: User;
  let mockResult: PaymentPlan;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentPlanService,
        {
          provide: getRepositoryToken(PaymentPlan),
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: UserService,
          useValue: {
            findUsersByIds: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PaymentPlanService>(PaymentPlanService);
    userService = module.get<UserService>(UserService);
    repo = module.get<Repository<PaymentPlan>>(getRepositoryToken(PaymentPlan));
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
      totalAmount: 10000000,
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
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should return a new instance of PaymentPlan', async () => {
      const dto: CreatePaymentPlanDto = {
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

      jest.spyOn(repo, 'save').mockResolvedValue(mockResult);

      const result = await service.create(dto, mockUser);

      expect(result).toEqual(mockResult);
      expect(repo.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it('should return all instances of PaymentPlan', async () => {
      const mockResultArray: PaymentPlan[] = [mockResult];

      jest.spyOn(repo, 'find').mockResolvedValue(mockResultArray);

      const result = await service.findAll(mockUser);

      expect(result).toEqual(mockResultArray);
      expect(repo.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a payment plan', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValue(mockResult);

      const result = await service.findOne('1', mockUser);

      expect(result).toEqual(mockResult);
      expect(repo.findOne).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if the payment plan does not exist', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValue(undefined);

      await expect(service.findOne('1', mockUser)).rejects.toThrow(
        NotFoundException,
      );
      await expect(service.findOne('1', mockUser)).rejects.toThrow(
        'Payment plan with id 1 not found',
      );
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
      jest.spyOn(service, 'findOne').mockResolvedValue(mockInitial);
      jest.spyOn(userService, 'findUsersByIds').mockResolvedValue([otherUser]);
      jest.spyOn(repo, 'save').mockResolvedValue(mockResult);

      const result = await service.update(mockResult.id, dto, mockUser);

      expect(result).toEqual(mockResult);
      expect(userService.findUsersByIds).toHaveBeenCalledTimes(1);
      expect(service.findOne).toHaveBeenCalledTimes(1);
      expect(repo.save).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception if the Payment Plan is not found', async () => {
      jest
        .spyOn(service, 'findOne')
        .mockRejectedValue(
          new NotFoundException('Payment plan with id 1 not found'),
        );
      await expect(service.update('2', dto, mockUser)).rejects.toThrow(
        NotFoundException,
      );

      expect(service.findOne).toHaveBeenCalledTimes(1);
      expect(repo.save).toHaveBeenCalledTimes(0);
    });

    it('should throw an exception if payment plan is not owned by the user', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(mockInitial);

      await expect(service.update('1', dto, otherUser)).rejects.toThrow(
        ForbiddenException,
      );
      expect(service.findOne).toHaveBeenCalledTimes(1);
      expect(repo.save).toHaveBeenCalledTimes(0);
    });

    it('should throw an exception if some participants do not exist', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(mockInitial);
      jest
        .spyOn(userService, 'findUsersByIds')
        .mockResolvedValue([mockUser, otherUser]);

      const error: BadRequestException = await service
        .update('1', dto, mockUser)
        .catch((err) => err);

				expect(service.findOne).toHaveBeenCalledTimes(1);
				expect(userService.findUsersByIds).toHaveBeenCalledTimes(1);
				expect(error).toBeInstanceOf(BadRequestException);
				expect(error.message).toBe('Some participants do not exist');
      expect(repo.save).toHaveBeenCalledTimes(0);
    });
  });
});
