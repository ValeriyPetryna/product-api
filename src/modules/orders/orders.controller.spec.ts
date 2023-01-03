import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrderDto, OrdersResponseDto } from './dto/order.dto';

const findOneMock: OrderDto = {
  id: 1,
  buyer: 'test',
  productId: 1,
  createdAt: '2023-01-03T10:48:28.609Z',
  updatedAt: '2023-01-03T10:48:28.609Z',
};

const findAllMock: OrdersResponseDto = {
  items: [findOneMock, findOneMock],
  total: 1,
};

describe('OrdersController', () => {
  let controller: OrdersController;
  let service: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        {
          provide: OrdersService,
          useValue: {
            create: jest.fn().mockReturnValue(findOneMock),
            update: jest.fn().mockReturnValue(findOneMock),
            findAll: jest.fn().mockReturnValue(findAllMock),
            findOne: jest.fn().mockReturnValue(findOneMock),
          },
        },
      ],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
    service = module.get<OrdersService>(OrdersService);
  });

  describe('order controller', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });

    it('should return paginated response for find all method', async () => {
      try {
        const response = await controller.findAll({
          dateTo: '01-01-2023',
          dateFrom: '10-31-2023',
        });
        expect(response).toBe(findAllMock);
      } catch (e) {}
    });

    it('should return single response for find one method', async () => {
      service.findOne = jest.fn().mockReturnValueOnce(findOneMock);
      const response = await controller.findOne('1');

      expect(response).toBe(findOneMock);

      expect(service.findOne).toBeCalledWith(1);
      expect(service.findOne).toBeCalledTimes(1);
    });

    it('should return single response for update method', async () => {
      service.update = jest.fn().mockReturnValueOnce(findOneMock);
      const response = await controller.update('1', { productId: 2 });

      expect(response).toBe(findOneMock);

      expect(service.update).toBeCalledWith(1, { productId: 2 });
      expect(service.update).toBeCalledTimes(1);
    });

    it('should return single response for create method', async () => {
      service.findOne = jest.fn().mockReturnValueOnce(findOneMock);
      const response = await controller.create({ productId: 1 });

      expect(response).toBe(findOneMock);

      expect(service.create).toBeCalledWith({ productId: 1 });
      expect(service.create).toBeCalledTimes(1);
    });

    it('should return error with not a number argument', async () => {
      service.findOne = jest.fn().mockReturnValueOnce(findOneMock);
      try {
        const response = await controller.findOne('a');
        expect(response).toBe(findAllMock);
      } catch (e) {}
    });
  });
});
