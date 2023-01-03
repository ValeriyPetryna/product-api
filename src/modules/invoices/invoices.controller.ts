import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { InvoiceDto, InvoiceResponseDto } from './dto/invoice.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Operations with Invoices')
@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @ApiOperation({
    description: 'Create new Invoice for specific Order',
  })
  @Post()
  create(@Body() createInvoiceDto: CreateInvoiceDto): Promise<InvoiceDto> {
    return this.invoicesService.create(createInvoiceDto);
  }

  @ApiOperation({
    description: 'Search Invoice by ID',
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<InvoiceResponseDto> {
    return this.invoicesService.findOne(+id);
  }

  @ApiOperation({
    description: 'Set Invoice by ID as PAID by user',
  })
  @Patch(':id/pay')
  update(@Param('id') id: string): Promise<InvoiceDto> {
    return this.invoicesService.payInvoice(+id);
  }
}
