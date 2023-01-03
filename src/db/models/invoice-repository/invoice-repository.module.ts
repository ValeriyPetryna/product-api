import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { InvoiceRepositoryService } from './invoice-repository.service';
import { Invoice } from './model/invoice.model';

@Module({
  exports: [InvoiceRepositoryService],
  imports: [SequelizeModule.forFeature([Invoice])],
  providers: [InvoiceRepositoryService],
})
export class InvoiceRepositoryModule {}
