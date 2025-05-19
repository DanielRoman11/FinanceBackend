import { Transform } from 'class-transformer';
import { IsDateString, IsOptional } from 'class-validator';

export class FindQueryParams {
  @IsOptional()
  categoryName?: string;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  amountFrom?: number;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  amountTo?: number;

  @IsOptional()
  @IsDateString()
  createdFrom?: string;

  @IsOptional()
  @IsDateString()
  createdTo?: string;
}
