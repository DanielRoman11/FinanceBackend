import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  Length,
  ValidateNested,
} from 'class-validator';
import { TransactionType } from '../entities/transaction.entity';
import { Transform, Type } from 'class-transformer';
import { CreateCategoryDto } from '../../categories/dto/create-category.dto';
import { User } from '../../auth/entities/user.entity';

export class CreateTransactionDto {
  @IsOptional()
  @Type(() => User)
  user?: User;

  @IsNotEmpty()
  @Length(1, 50)
  @Transform(({ value }) => value.trim())
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  amount: number;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateCategoryDto)
  category: CreateCategoryDto;

  @IsNotEmpty()
  @IsEnum(TransactionType)
  type: TransactionType;

  @IsOptional()
  @Length(1, 250)
  description?: string;

  @IsOptional()
  @IsDateString()
  createdAt?: string;
}
