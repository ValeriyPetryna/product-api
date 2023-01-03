import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { GetOrdersDto } from './dto/get-orders.dto';
import { OrderDto, OrdersResponseDto } from './dto/order.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Operations with Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiOperation({
    description: 'Create new Order',
  })
  @Post()
  create(@Body() createOrderDto: CreateOrderDto): Promise<OrderDto> {
    return this.ordersService.create(createOrderDto);
  }

  @ApiOperation({
    description: 'List of Orders, with date filter',
  })
  @Get()
  findAll(@Query() query: GetOrdersDto): Promise<OrdersResponseDto> {
    return this.ordersService.findAll(query);
  }

  @ApiOperation({
    description: 'Search Order by ID',
  })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<OrderDto> {
    return this.ordersService.findOne(+id);
  }

  @ApiOperation({
    description: 'Update Order by ID',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Promise<OrderDto> {
    return this.ordersService.update(+id, updateOrderDto);
  }
}
