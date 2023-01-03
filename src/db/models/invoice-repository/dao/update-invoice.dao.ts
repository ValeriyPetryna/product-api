import { InvoiceStatus } from '../types/invoice-status.types';

export class UpdateInvoiceDao {
  id?: number;
  orderId?: number;
  status?: InvoiceStatus;
}
