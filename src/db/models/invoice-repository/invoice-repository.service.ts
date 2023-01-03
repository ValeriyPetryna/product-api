import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Invoice } from './model/invoice.model';
import { InvoiceEntity } from './entity/invoice.entity';
import { AbstractRepositoryService } from '../../utils/abstract/abstract.repository.service';
import { PagingResponse } from '../../utils/paging.utils';
import { Order } from '../order-repository/model/order.model';
import { Product } from '../product-repository/model/product.model';
import { CreateInvoiceDao } from './dao/create-invoice.dao';
import { UpdateInvoiceDao } from './dao/update-invoice.dao';

@Injectable()
export class InvoiceRepositoryService extends AbstractRepositoryService<
  Invoice,
  InvoiceEntity
> {
  constructor(
    @InjectModel(Invoice)
    private readonly invoice: typeof Invoice,
  ) {
    super();
  }

  async createInvoice(
    createInvoiceRequestDto: CreateInvoiceDao,
  ): Promise<InvoiceEntity> {
    const invoice = await this.invoice.create(createInvoiceRequestDto);

    return this.getEntity(invoice);
  }

  async findInvoices(): Promise<PagingResponse<InvoiceEntity>> {
    const invoices = await this.invoice.findAll<Invoice>({
      include: {
        model: Order,
        as: 'order',
      },
    });

    const total = await this.countInvoices();

    return {
      items: invoices.map((invoice) => this.getEntity(invoice)),
      total,
    };
  }

  async findInvoiceById(invoiceId: number): Promise<InvoiceEntity> {
    const invoice = await this.invoice.findOne<Invoice>({
      where: {
        id: invoiceId,
      },
      include: {
        model: Order,
        as: 'order',
        include: [Product],
      },
    });

    return this.getEntity(invoice);
  }

  async updateInvoiceById(
    updateInvoiceByIdRequestDto: UpdateInvoiceDao,
  ): Promise<InvoiceEntity> {
    const [, result] = await this.invoice.update<Invoice>(
      updateInvoiceByIdRequestDto,
      {
        where: {
          id: updateInvoiceByIdRequestDto.id,
        },
        returning: true,
      },
    );

    return this.getEntity(result.shift());
  }

  countInvoices(): Promise<number> {
    return this.invoice.count<Invoice>({});
  }
}
