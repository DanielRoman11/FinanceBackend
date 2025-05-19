import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly ctRepo: Repository<Category>,
  ) {}
  async create(dto: CreateCategoryDto): Promise<Category> {
    return await this.ctRepo.save(dto);
  }

  async findAll() {
    return await this.ctRepo.find();
  }

  async findOne(id: number) {
    const category = await this.ctRepo.findOneBy({ id });
    if (!category)
      throw new NotFoundException(`The category with id ${id} was not found`);
    return category;
  }

  async update(id: number, dto: UpdateCategoryDto): Promise<Category> {
    const category = await this.findOne(id);
    return await this.ctRepo.save({ ...category, dto });
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.ctRepo.delete(id);
  }
}
