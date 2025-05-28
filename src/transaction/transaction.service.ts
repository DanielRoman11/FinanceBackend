import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { FindQueryParams } from './dto/findParams';
import { User } from '../auth/entities/user.entity';
import { UserService } from '../auth/user.service';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly trRepo: Repository<Transaction>,
    private readonly userService: UserService,
  ) {}

  async create(
    dto: CreateTransactionDto,
    currentUser: User,
  ): Promise<Transaction> {
    const user =
      (await this.userService.findUserById(dto.userId)) ?? currentUser;

    return await this.trRepo.save({ ...dto, user });
  }

  private baseQuery() {
    return this.trRepo.createQueryBuilder('t').orderBy('t.createdAt', 'DESC');
  }

  async findAll(queryParams: FindQueryParams, user: User) {
    const { categoryName, amountFrom, amountTo, createdFrom, createdTo } =
      queryParams;
    const query = this.baseQuery()
      .leftJoin('t.user', 'user')
      .leftJoinAndSelect('t.category', 'category')
      .addSelect('user.id')
      .where('user.id = :userId', { userId: user.id });
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

  async findOne(id: number, user: User) {
    const transaction = await this.trRepo.findOne({
      where: { id, user: { id: user.id } },
    });
    if (!transaction)
      throw new NotFoundException(`Transaction with id ${id} not found`);
    return transaction;
  }

  async update(id: number, dto: UpdateTransactionDto, user: User) {
    const transaction = await this.findOne(id, user);
    if (transaction.user.id !== user.id)
      throw new ForbiddenException(
        'You are not authorized to update this transaction',
      );
    return await this.trRepo.save({
      ...transaction,
      ...dto,
    });
  }

  async remove(id: number, user: User) {
    const transaction = await this.findOne(id, user);
    if (transaction.user.id !== user.id)
      throw new ForbiddenException(
        'You are not authorized to delete this transaction',
      );
    return await this.trRepo.delete(id);
  }
}
