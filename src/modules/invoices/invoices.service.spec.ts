import { Test, TestingModule } from '@nestjs/testing';
import { InvoicesService } from './invoices.service';
import { InvoiceRepositoryService } from '../../db/models/invoice-repository/invoice-repository.service';
import { OrderRepositoryService } from '../../db/models/order-repository/order-repository.service';
import { ProductsService } from '../products/products.service';
import { InvoiceDto, InvoiceResponseDto } from './dto/invoice.dto';
import { OrderDto } from '../orders/dto/order.dto';
import { ProductDto } from '../products/dto/product.dto';

const invoiceMock: InvoiceDto = {
  id: 1,
  status: 'CREATED',
  orderId: 1,
  price: 100,
  createdAt: '2023-01-03T10:48:28.609Z',
  updatedAt: '2023-01-03T10:48:28.609Z',
};

const invoiceMockResponse: InvoiceResponseDto = {
  id: 1,
  status: 'CREATED',
  price: 100,
  productName: 'product',
  orderDate: '2023-01-03T10:48:28.609Z',
  invoiceDate: '2023-01-03T10:48:28.609Z',
};

const orderMock: OrderDto = {
  id: 1,
  buyer: 'test',
  productId: 1,
  createdAt: '2023-01-03T10:48:28.609Z',
  updatedAt: '2023-01-03T10:48:28.609Z',
  product: {
    id: 1,
    price: 100,
    name: 'product',
    discount: 0,
    createdAt: '2023-01-03T10:48:28.609Z',
    updatedAt: '2023-01-03T10:48:28.609Z',
  },
};

const productMock: ProductDto = {
  id: 1,
  name: 'test',
  price: 100,
  discount: 0,
  createdAt: '2023-01-03T10:48:28.609Z',
  updatedAt: '2023-01-03T10:48:28.609Z',
};

describe('InvoicesService', () => {
  let service: InvoicesService;
  let productsService: ProductsService;
  let orderRepo: OrderRepositoryService;
  let invoiceRepo: InvoiceRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InvoicesService,
        {
          provide: InvoiceRepositoryService,
          useValue: {
            createInvoice: jest.fn().mockResolvedValue(invoiceMock),
            findInvoiceById: jest.fn().mockResolvedValue(invoiceMockResponse),
            updateInvoiceById: jest.fn().mockResolvedValue(invoiceMock),
          },
        },
        {
          provide: OrderRepositoryService,
          useValue: {
            findOrderById: jest.fn().mockResolvedValue(orderMock),
          },
        },
        {
          provide: ProductsService,
          useValue: {
            update: jest.fn().mockResolvedValue(productMock),
          },
        },
      ],
    }).compile();

    service = module.get<InvoicesService>(InvoicesService);
    productsService = module.get<ProductsService>(ProductsService);
    orderRepo = module.get<OrderRepositoryService>(OrderRepositoryService);
    invoiceRepo = module.get<InvoiceRepositoryService>(
      InvoiceRepositoryService,
    );
  });

  describe('invoice service', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    it('should return single response for find one method', async () => {
      const entityToDto = jest.spyOn(
        InvoicesService.prototype as any,
        'entityToDto',
      );
      entityToDto.mockImplementation(() => invoiceMockResponse);

      const response = await service.findOne(1);

      expect(response).toBe(invoiceMockResponse);

      expect(invoiceRepo.findInvoiceById).toBeCalledWith(1);
      expect(invoiceRepo.findInvoiceById).toBeCalledTimes(1);
    });

    it('should return single response for update method', async () => {
      const response = await service.payInvoice(1);

      expect(response).toBe(invoiceMock);

      expect(invoiceRepo.updateInvoiceById).toBeCalledWith({
        id: 1,
        status: 'PAID',
      });
      expect(invoiceRepo.updateInvoiceById).toBeCalledTimes(1);
    });

    it('should return single response for create method', async () => {
      const getDiscount = jest.spyOn(
        InvoicesService.prototype as any,
        'getProductDiscount',
      );
      getDiscount.mockImplementation(() => 20);

      const response = await service.create({ orderId: 1 });

      expect(response).toBe(invoiceMock);
      expect(getDiscount).toHaveBeenCalled();

      expect(orderRepo.findOrderById).toBeCalledWith(1);
      expect(invoiceRepo.createInvoice).toBeCalledTimes(1);
    });
  });
});
