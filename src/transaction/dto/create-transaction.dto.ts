import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  Length,
  ValidateNested,
} from 'class-validator';
import { TransactionType } from '../entities/transaction.entity';
import { Transform, Type } from 'class-transformer';
import { CreateCategoryDto } from '../../categories/dto/create-category.dto';

export class CreateTransactionDto {
  @IsNotEmpty()
  @Length(1, 50)
  @Transform(({ value }) => value.trim())
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  amount: number;

  @IsNotEmpty()
  @IsEnum(TransactionType)
  type: TransactionType;

  @IsOptional()
  @IsString()
  @Length(1, 250)
  description?: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateCategoryDto)
  category: CreateCategoryDto;

	@IsOptional()
  @IsString()
  @IsUUID('4', { message: 'userId must be a valid UUID' })
  userId?: string;

  @IsOptional()
  @IsDateString()
  createdAt?: string;
}
