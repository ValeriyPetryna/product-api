import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsOptional()
  buyer?: string;

  @IsNumber()
  productId: number;
}
