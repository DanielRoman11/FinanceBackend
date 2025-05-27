import {
  IsString,
  IsNumber,
  IsEnum,
  IsDateString,
  IsArray,
  IsUUID,
  Length,
  Min,
} from 'class-validator';
import {
  Currency,
  PaymentInterval,
  PaymentPlanStatus,
} from '../../utils/enums';
import { Type } from 'class-transformer';

export class CreatePaymentPlanDto {
  @IsString()
  @Length(5, 255)
  name: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @Type(() => Number)
  @IsNumber({}, { message: 'totalAmount must be a number' })
  @Min(0.01)
  totalAmount: number;

  @IsEnum(PaymentPlanStatus)
  status: PaymentPlanStatus;

  @IsEnum(Currency)
  currency: Currency;

  @IsEnum(PaymentInterval)
  interval: PaymentInterval;

  @IsArray()
  @IsUUID('all', { each: true })
  participantIds: string[];
}
