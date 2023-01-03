import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './model/order.model';
import { OrderEntity } from './entity/order.entity';
import { AbstractRepositoryService } from '../../utils/abstract/abstract.repository.service';
import { PagingResponse } from '../../utils/paging.utils';
import { Op } from 'sequelize';
import { Product } from '../product-repository/model/product.model';
import { CreateOrderDao } from './dao/create-order.dao';
import { GetOrdersDao } from './dao/get-orders.dao';
import { UpdateOrderDao } from './dao/update-order.dao';

@Injectable()
export class OrderRepositoryService extends AbstractRepositoryService<
  Order,
  OrderEntity
> {
  constructor(
    @InjectModel(Order)
    private readonly order: typeof Order,
  ) {
    super();
  }

  async createOrder(
    createOrderRequestDto: CreateOrderDao,
  ): Promise<OrderEntity> {
    const order = await this.order.create(createOrderRequestDto);

    return this.getEntity(order);
  }

  async findOrders(
    findOrdersRequestDto: GetOrdersDao,
  ): Promise<PagingResponse<OrderEntity>> {
    const orders = await this.order.findAll<Order>({
      where: {
        createdAt: {
          ...(findOrdersRequestDto.dateFrom
            ? { [Op.gte]: findOrdersRequestDto.dateFrom }
            : null),
          ...(findOrdersRequestDto.dateTo
            ? { [Op.lte]: findOrdersRequestDto.dateTo }
            : null),
        },
      },
      include: {
        model: Product,
        as: 'product',
      },
    });

    const total = await this.countOrders();

    return {
      items: orders.map((order) => this.getEntity(order)),
      total,
    };
  }

  async findOrderById(orderId: number): Promise<OrderEntity> {
    const order = await this.order.findOne<Order>({
      where: {
        id: orderId,
      },
      include: {
        model: Product,
        as: 'product',
      },
    });

    return this.getEntity(order);
  }

  async updateOrderById(
    updateOrderByIdRequestDto: UpdateOrderDao,
  ): Promise<OrderEntity> {
    const [, result] = await this.order.update<Order>(
      updateOrderByIdRequestDto,
      {
        where: {
          id: updateOrderByIdRequestDto.id,
        },
        returning: true,
      },
    );

    return this.getEntity(result.shift());
  }

  countOrders(): Promise<number> {
    return this.order.count<Order>({});
  }
}
