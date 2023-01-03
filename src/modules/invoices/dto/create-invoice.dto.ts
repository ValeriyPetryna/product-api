import { IsNumber } from 'class-validator';

export class CreateInvoiceDto {
  @IsNumber()
  orderId: number;
}
