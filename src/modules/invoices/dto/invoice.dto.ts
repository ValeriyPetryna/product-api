import { OrderDto } from 'src/modules/orders/dto/order.dto';

export class InvoiceDto {
  id: number;
  orderId: number;
  price: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  order?: Partial<OrderDto>;
}

export class InvoiceResponseDto {
  id: number;
  price: number;
  productName: string;
  status: string;
  invoiceDate: string;
  orderDate: string;
}
