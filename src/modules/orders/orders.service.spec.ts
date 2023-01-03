import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { OrderDto, OrdersResponseDto } from './dto/order.dto';
import { OrderRepositoryService } from '../../db/models/order-repository/order-repository.service';

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

describe('OrdersService', () => {
  let service: OrdersService;
  let repo: OrderRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: OrderRepositoryService,
          useValue: {
            createOrder: jest.fn().mockResolvedValue(findOneMock),
            findOrders: jest.fn().mockResolvedValue(findAllMock),
            findOrderById: jest.fn().mockResolvedValue(findOneMock),
            updateOrderById: jest.fn().mockResolvedValue(findOneMock),
          },
        },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
    repo = module.get<OrderRepositoryService>(OrderRepositoryService);
  });

  describe('order service', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    it('should return paginated response for find all method', async () => {
      const response = await service.findAll({
        dateTo: '01-01-2023',
        dateFrom: '10-31-2023',
      });

      expect(response).toBe(findAllMock);
      expect(response.items.length).toBe(2);
      expect(repo.findOrders).toBeCalledTimes(1);
    });

    it('should return single response for find one method', async () => {
      const response = await service.findOne(1);

      expect(response).toBe(findOneMock);

      expect(repo.findOrderById).toBeCalledWith(1);
      expect(repo.findOrderById).toBeCalledTimes(1);
    });

    it('should return single response for update method', async () => {
      const response = await service.update(1, { productId: 1 });

      expect(response).toBe(findOneMock);

      expect(repo.updateOrderById).toBeCalledWith({ id: 1, productId: 1 });
      expect(repo.updateOrderById).toBeCalledTimes(1);
    });

    it('should return single response for create method', async () => {
      const response = await service.create({ productId: 1 });

      expect(response).toBe(findOneMock);

      expect(repo.createOrder).toBeCalledWith({ productId: 1 });
      expect(repo.createOrder).toBeCalledTimes(1);
    });
  });
});
