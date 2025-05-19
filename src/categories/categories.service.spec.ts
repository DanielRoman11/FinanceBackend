import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from './categories.service';
import { DeleteResult, Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';

describe('CategoriesService', () => {
  let service: CategoriesService;
  let repo: Repository<Category>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: getRepositoryToken(Category),
          useValue: {
            find: jest.fn(),
            findOneBy: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
    repo = module.get<Repository<Category>>(getRepositoryToken(Category));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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

      jest.spyOn(repo, 'save').mockResolvedValue(mockCategory);

      const result = await service.create(mockCategoryDto);

      expect(result).toEqual(mockCategory);
      expect(repo.save).toHaveBeenCalledTimes(1);
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

      jest.spyOn(repo, 'find').mockResolvedValue(mockCategories);

      const result = await service.findAll();

      expect(result).toEqual(mockCategories);
      expect(repo.find).toHaveBeenCalledTimes(1);
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

      jest.spyOn(repo, 'findOneBy').mockResolvedValue(mockCategory);

      const result = await service.findOne(1);

      expect(result).toEqual(mockCategory);
      expect(repo.findOneBy).toHaveBeenCalledTimes(1);
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
      const mockNewCategory: Category = {
        id: 1,
        name: 'New Name',
        createdAt: new Date(),
        updatedAt: new Date(),
        transactions: [],
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(mockCategory);
      jest.spyOn(repo, 'save').mockResolvedValue(mockNewCategory);

      const result = await service.update(1, {
        name: 'New Name',
      });

			expect(service.findOne).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockNewCategory);
      expect(repo.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('Delete', () => {
    it('Should delete a category', async () => {
      const mockDeleteResult: DeleteResult = {
        raw: {},
        affected: 1,
      };

      jest.spyOn(repo, 'delete').mockResolvedValue(mockDeleteResult);

      const result = await service.remove(1);

      expect(result).toEqual(mockDeleteResult);
      expect(repo.delete).toHaveBeenCalledWith(1);
      expect(repo.delete).toHaveBeenCalledTimes(1);
    });
  });
});
