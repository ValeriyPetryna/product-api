import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderRepositoryService } from '../../db/models/order-repository/order-repository.service';
import { GetOrdersDto } from './dto/get-orders.dto';
import { OrderDto, OrdersResponseDto } from './dto/order.dto';
import { convertToDate } from '../common/helper/date.helper';

@Injectable()
export class OrdersService {
  constructor(
    private readonly orderRepositoryService: OrderRepositoryService,
  ) {}

  async create(dto: CreateOrderDto): Promise<OrderDto> {
    return this.orderRepositoryService.createOrder(dto);
  }

  async findAll(dto: GetOrdersDto): Promise<OrdersResponseDto> {
    return this.orderRepositoryService.findOrders({
      dateFrom: dto.dateFrom ? convertToDate(dto.dateFrom) : null,
      dateTo: dto.dateTo ? convertToDate(dto.dateTo) : null,
    });
  }

  async findOne(id: number): Promise<OrderDto> {
    return this.orderRepositoryService.findOrderById(id);
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<OrderDto> {
    return this.orderRepositoryService.updateOrderById({
      id,
      ...updateOrderDto,
    });
  }
}
