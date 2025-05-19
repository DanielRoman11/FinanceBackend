import { Test, TestingModule } from '@nestjs/testing';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { Transaction, TransactionType } from './entities/transaction.entity';
import { Category } from '../categories/entities/category.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';

describe('TransactionController', () => {
  let controller: TransactionController;
  let service: TransactionService;

  beforeEach(async () => {
    const mockTransactionService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionController],
      providers: [
        {
          provide: TransactionService,
          useValue: mockTransactionService,
        },
      ],
    }).compile();

    controller = module.get(TransactionController);
    service = module.get(TransactionService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Create', () => {
    it('Should create an instance of Transaction', async () => {
      const mockTransactionDto: CreateTransactionDto = {
        name: 'Salary',
        amount: 1000,
        category: { id: 1, name: 'Work' },
        type: TransactionType.INCOME,
      };
      const mockTransaction: Transaction = {
        id: 1,
        name: 'Salary',
        amount: 1000,
        type: TransactionType.INCOME,
        createdAt: new Date(),
        updatedAt: new Date(),
        category: { id: 1, name: 'Work' } as Category,
      };

      jest.spyOn(service, 'create').mockResolvedValue(mockTransaction);

      const result = await service.create(mockTransactionDto);

      expect(result).toEqual(mockTransaction);
      expect(service.create).toHaveBeenCalledTimes(1);
    });
  });
});
