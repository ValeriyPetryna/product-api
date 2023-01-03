import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { BadRequestException } from '@nestjs/common';
import { ProductDto, ProductsResponseDto } from './dto/product.dto';

const findOneMock: ProductDto = {
  id: 1,
  name: 'test',
  price: 100,
  discount: 0,
  createdAt: '2023-01-03T10:48:28.609Z',
  updatedAt: '2023-01-03T10:48:28.609Z',
};

const findAllMock: ProductsResponseDto = {
  items: [findOneMock, findOneMock],
  total: 1,
};

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: {
            findAll: jest.fn().mockReturnValue(findAllMock),
            findOne: jest.fn().mockReturnValue(findOneMock),
          },
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  describe('product controller', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });

    it('should return paginated response for find all method', async () => {
      try {
        const response = await controller.findAll();
        expect(response).toBe(findAllMock);
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestException);
      }
    });

    it('should return single response for find one method', async () => {
      const response = await controller.findOne('1');

      expect(response).toBe(findOneMock);

      expect(service.findOne).toBeCalledWith(1);
      expect(service.findOne).toBeCalledTimes(1);
    });

    it('should return error with not a number argument', async () => {
      try {
        const response = await controller.findOne('a');
        expect(response).toBe(findAllMock);
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestException);
        expect(e.message).toBe("Parameter 'Id' should be a number");
      }
    });
  });
});
