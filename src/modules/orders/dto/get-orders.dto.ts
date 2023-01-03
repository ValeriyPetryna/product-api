import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsOptional } from 'class-validator';

export class GetOrdersDto {
  @ApiProperty({
    description: 'MM-DD-YYYY',
  })
  @IsOptional()
  @IsDateString()
  @IsNotEmpty()
  dateFrom?: string;

  @ApiProperty({
    description: 'MM-DD-YYYY',
  })
  @IsOptional()
  @IsDateString()
  @IsNotEmpty()
  dateTo?: string;
}
