import { Test, TestingModule } from '@nestjs/testing';
import { InvoicesController } from './invoices.controller';
import { InvoicesService } from './invoices.service';
import { InvoiceDto, InvoiceResponseDto } from './dto/invoice.dto';

const findOneMock: InvoiceDto = {
  id: 1,
  status: 'CREATED',
  orderId: 1,
  price: 100,
  createdAt: '2023-01-03T10:48:28.609Z',
  updatedAt: '2023-01-03T10:48:28.609Z',
};

const findOneMockResponse: InvoiceResponseDto = {
  id: 1,
  status: 'CREATED',
  price: 100,
  productName: 'product',
  orderDate: '2023-01-03T10:48:28.609Z',
  invoiceDate: '2023-01-03T10:48:28.609Z',
};

describe('InvoicesController', () => {
  let controller: InvoicesController;
  let service: InvoicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvoicesController],
      providers: [
        {
          provide: InvoicesService,
          useValue: {
            create: jest.fn().mockReturnValue(findOneMock),
            payInvoice: jest.fn().mockReturnValue(findOneMock),
            findOne: jest.fn().mockReturnValue(findOneMockResponse),
          },
        },
      ],
    }).compile();

    controller = module.get<InvoicesController>(InvoicesController);
    service = module.get<InvoicesService>(InvoicesService);
  });

  describe('invoice controller', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });

    it('should return single response for find one method', async () => {
      const response = await controller.findOne('1');

      expect(response).toBe(findOneMockResponse);

      expect(service.findOne).toBeCalledWith(1);
      expect(service.findOne).toBeCalledTimes(1);
    });

    it('should return single response for pay invoice method', async () => {
      const response = await controller.update('1');

      expect(response).toBe(findOneMock);

      expect(service.payInvoice).toBeCalledWith(1);
      expect(service.payInvoice).toBeCalledTimes(1);
    });

    it('should return single response for create method', async () => {
      const response = await controller.create({ orderId: 1 });

      expect(response).toBe(findOneMock);

      expect(service.create).toBeCalledWith({ orderId: 1 });
      expect(service.create).toBeCalledTimes(1);
    });
  });
});
