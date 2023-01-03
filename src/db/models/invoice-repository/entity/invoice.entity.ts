import { OrderEntity } from '../../order-repository/entity/order.entity';
import { InvoiceStatus } from '../types/invoice-status.types';

export interface InvoiceEntity {
  id: number;
  orderId: number;
  price: number;
  status: InvoiceStatus;
  createdAt: string;
  updatedAt: string;
  order?: Partial<OrderEntity>;
}
