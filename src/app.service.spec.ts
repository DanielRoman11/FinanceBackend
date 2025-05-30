import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { DataSource } from 'typeorm';
import { User } from './auth/entities/user.entity';

describe('AppService', () => {
  let service: AppService;
  let dataSource: DataSource;
  let mockResponse: Record<string, string>[];
  let mockUser: User;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: DataSource,
          useValue: {
            query: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AppService>(AppService);
    dataSource = module.get<DataSource>(DataSource);

    mockResponse = [
      {
        type: 'income',
        totalamount: '8000',
        name: 'Test',
      },
    ];
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

  describe('Summary', () => {
    it('Should return data for the dashboard', async () => {
      jest.spyOn(dataSource, 'query').mockResolvedValue(mockResponse);

      const result = await service.getSummary(mockUser);

      expect(dataSource.query).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getSummary', () => {
    it('should return data for the dashboard', async () => {
      jest.spyOn(dataSource, 'query').mockResolvedValue(mockResponse);

      const result = await service.getSummary(mockUser);

      expect(dataSource.query).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockResponse);
    });

    it('should throw an error if the query fails', async () => {
      const errorResponse = new Error('Db Error');
      jest.spyOn(dataSource, 'query').mockRejectedValue(errorResponse);

      await expect(service.getSummary(mockUser)).rejects.toThrow(
        errorResponse.message,
      );
    });
  });
});
