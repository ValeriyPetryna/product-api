import { Module } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { InvoicesController } from './invoices.controller';
import { ProductsModule } from '../products/products.module';
import { OrderRepositoryModule } from '../../db/models/order-repository/order-repository.module';
import { InvoiceRepositoryModule } from '../../db/models/invoice-repository/invoice-repository.module';

@Module({
  imports: [InvoiceRepositoryModule, OrderRepositoryModule, ProductsModule],
  controllers: [InvoicesController],
  providers: [InvoicesService],
})
export class InvoicesModule {}
