import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { FindQueryParams } from './dto/findParams';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly trRepo: Repository<Transaction>,
  ) {}

  async create(dto: CreateTransactionDto): Promise<Transaction> {
    return await this.trRepo.save(dto);
  }

  private baseQuery() {
    return this.trRepo.createQueryBuilder('t').orderBy('t.createdAt', 'DESC');
  }

  async findAll(queryParams: FindQueryParams) {
    const { categoryName, amountFrom, amountTo, createdFrom, createdTo } =
      queryParams;
    const query = this.baseQuery();
    if (categoryName) {
      query.andWhere('t.category.name = :categoryName', { categoryName });
    }
    if (amountFrom && amountTo) {
      query.andWhere('t.amount >= :amountFrom AND t.amount <= :amountTo', {
        amountFrom,
        amountTo,
      });
    }
    if (createdFrom && createdTo) {
      query.andWhere(
        't.createdAt >= :createdFrom AND t.createdAt <= :createdTo',
        { createdFrom, createdTo },
      );
    }
    return await query.getMany();
  }

  async findOne(id: number) {
    const transaction = await this.trRepo.findOneBy({ id });
    if (!transaction)
      throw new NotFoundException(`Transaction with id ${id} not found`);
    return transaction;
  }

  async update(id: number, dto: UpdateTransactionDto) {
    const transaction = this.findOne(id);
    return await this.trRepo.save({
      ...transaction,
      ...dto,
    });
  }

  async remove(id: number) {
    return await this.trRepo.delete(id);
  }
}
