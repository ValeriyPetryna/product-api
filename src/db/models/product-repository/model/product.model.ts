import { Column, Default, HasMany, Table } from 'sequelize-typescript';
import { AbstractModel } from '../../../../db/utils/abstract/abstract.model';
import { ProductEntity } from '../entity/product.entity';
import { Order } from '../../order-repository/model/order.model';

@Table({})
export class Product extends AbstractModel<Product, ProductEntity> {
  @Column
  name: string;

  @Column
  price: number;

  @Default(0)
  @Column
  discount: number;

  modelToEntity(model: Product = this): ProductEntity {
    if (!model) {
      return undefined;
    }

    const entity: ProductEntity = {
      id: model.id,
      name: model.name,
      price: model.price,
      discount: model.discount,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    };

    return entity;
  }
}
