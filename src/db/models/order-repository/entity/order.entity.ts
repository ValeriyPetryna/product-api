import { ProductEntity } from '../../product-repository/entity/product.entity';

export interface OrderEntity {
  id: number;
  buyer: string;
  productId: number;
  createdAt: string;
  updatedAt: string;
  product?: Partial<ProductEntity>;
}
