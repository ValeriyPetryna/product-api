import {
  Column,
  Table,
  Default,
  ForeignKey,
  BelongsTo,
  Unique,
} from 'sequelize-typescript';
import { AbstractModel } from '../../../../db/utils/abstract/abstract.model';
import { InvoiceEntity } from '../entity/invoice.entity';
import { Order } from '../../order-repository/model/order.model';
import { INVOICE_STATUS, InvoiceStatus } from '../types/invoice-status.types';

@Table({})
export class Invoice extends AbstractModel<Invoice, InvoiceEntity> {
  @Unique('orderId_unique_constraint')
  @ForeignKey(() => Order)
  @Column
  orderId: number;

  @Default(INVOICE_STATUS.CREATED)
  @Column
  status: InvoiceStatus;

  @Column
  price: number;

  @BelongsTo(() => Order, {
    as: 'order',
  })
  order: Order;

  modelToEntity(model: Invoice = this): InvoiceEntity {
    if (!model) {
      return undefined;
    }

    const entity: InvoiceEntity = {
      id: model.id,
      orderId: model.orderId,
      status: model.status,
      price: model.price,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    };

    if (model.order) {
      entity.order = model.order.modelToEntity(model.order);
    }

    return entity;
  }
}
