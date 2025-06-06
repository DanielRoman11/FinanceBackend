import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './auth/entities/user.entity';

describe('AppController', () => {
  let controller: AppController;
  let service: AppService;
  let mockResult: Record<string, string>[];
  let mockUser: User;

  const mockService = {
    getSummary: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: AppService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get(AppController);
    service = module.get(AppService);

    mockResult = [
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
    expect(controller).toBeDefined();
  });

  describe('Summary', () => {
    it('should return an Array of Summary data for the dashboard', async () => {
      jest.spyOn(service, 'getSummary').mockResolvedValue(mockResult);

      const result = await controller.getSummary(mockUser);

      expect(result).toEqual(mockResult);
      expect(service.getSummary).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if query fails', async () => {
      const errorResponse = new Error('Db Error');
      jest.spyOn(service, 'getSummary').mockRejectedValue(errorResponse);

      await expect(service.getSummary(mockUser)).rejects.toThrow(
        errorResponse.message,
      );
    });
  });
});
