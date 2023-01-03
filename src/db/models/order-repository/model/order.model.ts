import {
  BelongsTo,
  Column,
  Default,
  ForeignKey,
  Table,
} from 'sequelize-typescript';
import { AbstractModel } from '../../../../db/utils/abstract/abstract.model';
import { OrderEntity } from '../entity/order.entity';
import { Product } from '../../product-repository/model/product.model';

@Table({})
export class Order extends AbstractModel<Order, OrderEntity> {
  @Default('Test User')
  @Column
  buyer: string;

  @ForeignKey(() => Product)
  @Column
  productId: number;

  @BelongsTo(() => Product, {
    as: 'product',
  })
  product: Product;

  modelToEntity(model: Order = this): OrderEntity {
    if (!model) {
      return undefined;
    }

    const entity: OrderEntity = {
      id: model.id,
      buyer: model.buyer,
      productId: model.productId,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    };

    if (model.product) {
      entity.product = model.product.modelToEntity(model.product);
    }

    return entity;
  }
}
