import { getRepositoryToken } from '@nestjs/typeorm';
import { Transaction, TransactionType } from './entities/transaction.entity';
import { TransactionService } from './transaction.service';
import { Test, TestingModule } from '@nestjs/testing';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Category } from '../categories/entities/category.entity';

describe('TransactionService', () => {
  let service: TransactionService;
  let repo: Repository<Transaction>;
  const mockQueryBuilder = {
    andWhere: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    getMany: jest.fn().mockResolvedValue([]),
  } as unknown as jest.Mocked<SelectQueryBuilder<Transaction>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionService,
        {
          provide: getRepositoryToken(Transaction),
          useValue: {
            find: jest.fn(),
            findOneBy: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            remove: jest.fn(),
            createQueryBuilder: jest.fn(() => mockQueryBuilder),
          },
        },
      ],
    }).compile();

    service = module.get<TransactionService>(TransactionService);
    repo = module.get<Repository<Transaction>>(getRepositoryToken(Transaction));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('Should return an array of transactions', async () => {
      const mockTransactions: Transaction[] = [
        {
          id: 1,
          name: 'Salary',
          amount: 1000,
          type: TransactionType.INCOME,
          createdAt: new Date(),
          updatedAt: new Date(),
          category: { id: 1, name: 'Work' } as Category,
        },
      ];

      mockQueryBuilder.getMany.mockResolvedValue(mockTransactions);

      const result = await service.findAll({});

      expect(result).toEqual(mockTransactions);
      expect(mockQueryBuilder.getMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a transaction', async () => {
      const mockTransaction: Transaction = {
        id: 1,
        name: 'Salary',
        amount: 1000,
        type: TransactionType.INCOME,
        createdAt: new Date(),
        updatedAt: new Date(),
        category: { id: 1, name: 'Work' } as Category,
      };

      jest.spyOn(repo, 'findOneBy').mockResolvedValue(mockTransaction);

      const result = await service.findOne(1);

      expect(result).toEqual(mockTransaction);
      expect(repo.findOneBy).toHaveBeenCalledTimes(1);
    });
  });
});
