import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { ProductRepositoryService } from '../../db/models/product-repository/product-repository.service';
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

describe('ProductsService', () => {
  let service: ProductsService;
  let repo: ProductRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: ProductRepositoryService,
          useValue: {
            updateProductById: jest.fn().mockReturnValue(findOneMock),
            findProductById: jest.fn().mockReturnValue(findOneMock),
            findProducts: jest.fn().mockReturnValue(findAllMock),
          },
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    repo = module.get<ProductRepositoryService>(ProductRepositoryService);
  });

  describe('product service', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    it('should return paginated response for find all method', async () => {
      const response = await service.findAll();

      expect(response).toBe(findAllMock);
      expect(response.items.length).toBe(2);
      expect(repo.findProducts).toBeCalledTimes(1);
    });

    it('should return single response for find one method', async () => {
      const response = await service.findOne(1);

      expect(response).toBe(findOneMock);

      expect(repo.findProductById).toBeCalledWith(1);
      expect(repo.findProductById).toBeCalledTimes(1);
    });

    it('should return single response for update method', async () => {
      const response = await service.update(1, { productId: 1 });

      expect(response).toBe(findOneMock);

      expect(repo.updateProductById).toBeCalledWith({ id: 1, productId: 1 });
      expect(repo.updateProductById).toBeCalledTimes(1);
    });
  });
});
