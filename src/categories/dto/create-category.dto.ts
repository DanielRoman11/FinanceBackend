import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  Length,
} from 'class-validator';

export class CreateCategoryDto {
  @IsOptional()
  @IsPositive()
  id?: number;

  @IsNotEmpty()
  @Length(1, 50)
  name: string;

  @IsOptional()
  @IsDateString()
  createdAt?: string;
}
