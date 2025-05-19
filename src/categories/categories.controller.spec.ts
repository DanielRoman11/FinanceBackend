import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { DeleteResult } from 'typeorm';

describe('CategoriesController', () => {
  let controller: CategoriesController;
  let service: CategoriesService;

  const mockCategoryService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        CategoriesService,
        {
          provide: CategoriesService,
          useValue: mockCategoryService,
        },
      ],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
    service = module.get(CategoriesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Create', () => {
    it('Should create an instance of Category', async () => {
      const mockCategoryDto: CreateCategoryDto = {
        name: 'Work',
      };
      const mockCategory: Category = {
        id: 1,
        name: 'Work',
        createdAt: new Date(),
        updatedAt: new Date(),
        transactions: [],
      };

      jest.spyOn(service, 'create').mockResolvedValue(mockCategory);

      const result = await service.create(mockCategoryDto);

      expect(result).toEqual(mockCategory);
      expect(service.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('FindAll', () => {
    it('Should return an array of categories', async () => {
      const mockCategories: Category[] = [
        {
          id: 1,
          name: 'Work',
          createdAt: new Date(),
          updatedAt: new Date(),
          transactions: [],
        },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(mockCategories);

      const result = await service.findAll();

      expect(result).toEqual(mockCategories);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('FindOne', () => {
    it('Should return a category', async () => {
      const mockCategory: Category = {
        id: 1,
        name: 'Work',
        createdAt: new Date(),
        updatedAt: new Date(),
        transactions: [],
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(mockCategory);

      const result = await service.findOne(1);

      expect(result).toEqual(mockCategory);
      expect(service.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('Update', () => {
    it('Should update a category', async () => {
      const mockCategory: Category = {
        id: 1,
        name: 'Work',
        createdAt: new Date(),
        updatedAt: new Date(),
        transactions: [],
      };
      const mockCategoryDto: UpdateCategoryDto = {
        name: 'New Name',
      };

      jest.spyOn(service, 'update').mockResolvedValue(mockCategory);

      const result = await service.update(1, mockCategoryDto);

      expect(result).toEqual(mockCategory);
      expect(service.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('Delete', () => {
    it('Should delete a category', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue(new DeleteResult());
      const mockDeleteResult: DeleteResult = {
        raw: {},
        affected: 1,
      };

      jest.spyOn(service, 'remove').mockResolvedValue(mockDeleteResult);
      const result = await service.remove(1);

      expect(result).toEqual(mockDeleteResult);
      expect(service.remove).toHaveBeenCalledTimes(1);
    });
  });
});
