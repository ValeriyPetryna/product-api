import { ProductDto } from 'src/modules/products/dto/product.dto';

export class OrderDto {
  id: number;
  buyer: string;
  productId: number;
  createdAt: string;
  updatedAt: string;
  product?: Partial<ProductDto>;
}

export class OrdersResponseDto {
  items: OrderDto[];
  total: number;
}
