import { Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { InvoiceRepositoryService } from '../../db/models/invoice-repository/invoice-repository.service';
import { OrderRepositoryService } from '../../db/models/order-repository/order-repository.service';
import { InvoiceDto, InvoiceResponseDto } from './dto/invoice.dto';
import { monthDifference } from '../common/helper/date.helper';
import {
  DISCOUNT_VALUE,
  MONTH_DIFFERENCE_FOR_DISCOUNT,
} from '../common/constants';
import { ProductsService } from '../products/products.service';
import { ProductEntity } from '../../db/models/product-repository/entity/product.entity';
import { InvoiceEntity } from '../../db/models/invoice-repository/entity/invoice.entity';
import { INVOICE_STATUS } from '../../db/models/invoice-repository/types/invoice-status.types';

@Injectable()
export class InvoicesService {
  constructor(
    private readonly productsService: ProductsService,
    private readonly invoiceRepositoryService: InvoiceRepositoryService,
    private readonly orderRepositoryService: OrderRepositoryService,
  ) {}

  private entityToDto(entity: InvoiceEntity): InvoiceResponseDto {
    if (!entity) {
      return undefined;
    }

    const dto: InvoiceResponseDto = {
      id: entity.id,
      status: entity.status,
      price: entity.price,
      productName: entity.order.product.name,
      orderDate: entity.order.createdAt,
      invoiceDate: entity.createdAt,
    };

    return dto;
  }

  async create(createInvoiceDto: CreateInvoiceDto): Promise<InvoiceDto> {
    const order = await this.orderRepositoryService.findOrderById(
      createInvoiceDto.orderId,
    );

    const discount = await this.getProductDiscount(order.product);

    const price = this.calculateOrderPrice(
      order.product.price,
      discount || order.product.discount,
    );

    return this.invoiceRepositoryService.createInvoice({
      ...createInvoiceDto,
      price,
    });
  }

  async findOne(id: number): Promise<InvoiceResponseDto> {
    const invoice = await this.invoiceRepositoryService.findInvoiceById(id);

    return this.entityToDto(invoice);
  }

  async update(
    id: number,
    updateInvoiceDto: UpdateInvoiceDto,
  ): Promise<InvoiceDto> {
    return this.invoiceRepositoryService.updateInvoiceById({
      id,
      ...updateInvoiceDto,
    });
  }

  async payInvoice(id: number): Promise<InvoiceDto> {
    const invoice = await this.invoiceRepositoryService.updateInvoiceById({
      id,
      status: INVOICE_STATUS.PAID,
    });

    return invoice;
  }

  private calculateOrderPrice(price: number, discount = 0): number {
    return price - (price * discount) / 100;
  }

  private async getProductDiscount(
    product: Partial<ProductEntity>,
  ): Promise<number> {
    if (!product.discount) {
      // check for 20% discount and apply if needed
      const checkProductDiscount = monthDifference(product.createdAt);

      if (checkProductDiscount > MONTH_DIFFERENCE_FOR_DISCOUNT) {
        const updatedProduct = await this.productsService.update(product.id, {
          discount: DISCOUNT_VALUE,
        });

        return updatedProduct.discount;
      }
    }

    return product.discount;
  }
}
