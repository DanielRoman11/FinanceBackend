import {
  IsUUID,
  IsEnum,
  IsDateString,
  IsNumber,
  IsPositive,
} from 'class-validator';
import { PaymentStatus } from '../../utils/enums';

export class CreatePaymentRecordDto {
  @IsNumber()
  @IsPositive()
  amount: number;

  @IsDateString({})
  paymentDate: string;

  @IsEnum(PaymentStatus)
  status: PaymentStatus;

  @IsUUID('4', { message: 'planId must be a valid UUID' })
  planId: string;
}
