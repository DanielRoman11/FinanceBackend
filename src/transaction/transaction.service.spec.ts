import { getRepositoryToken } from '@nestjs/typeorm';
import { Transaction, TransactionType } from './entities/transaction.entity';
import { TransactionService } from './transaction.service';
import { Test, TestingModule } from '@nestjs/testing';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Category } from '../categories/entities/category.entity';
import { User } from '../auth/entities/user.entity';

describe('TransactionService', () => {
  let service: TransactionService;
  let repo: Repository<Transaction>;
  let mockUser: User;

  const mockQueryBuilder = {
    andWhere: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    getMany: jest.fn().mockResolvedValue([]),
    leftJoin: jest.fn().mockReturnThis(),
    leftJoinAndSelect: jest.fn().mockReturnThis(),
    addSelect: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
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
    mockUser = {
      id: 'afdb2c8d-dc32-4742-b8d1-2435110dde52',
      username: 'test-user',
      email: 'test@test.com',
      picture: 'test-picture',
      createdAt: new Date(),
    };
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
          user: { id: 'afdb2c8d-dc32-4742-b8d1-2435110dde52' } as User,
          category: { id: 1, name: 'Work' } as Category,
        },
      ];

      mockQueryBuilder.getMany.mockResolvedValue(mockTransactions);

      const result = await service.findAll({}, mockUser);

      expect(result).toEqual(mockTransactions);
      expect(mockQueryBuilder.leftJoin).toHaveBeenCalledTimes(1);
      expect(mockQueryBuilder.leftJoinAndSelect).toHaveBeenCalledTimes(1);
      expect(mockQueryBuilder.addSelect).toHaveBeenCalledTimes(1);
      expect(mockQueryBuilder.where).toHaveBeenCalledTimes(1);
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
        user: { id: 'afdb2c8d-dc32-4742-b8d1-2435110dde52' } as User,
      };

      jest.spyOn(repo, 'findOneBy').mockResolvedValue(mockTransaction);

      const result = await service.findOne(1);

      expect(result).toEqual(mockTransaction);
      expect(repo.findOneBy).toHaveBeenCalledTimes(1);
    });
  });
});
