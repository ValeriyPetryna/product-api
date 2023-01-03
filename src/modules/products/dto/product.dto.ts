export class ProductDto {
  id: number;
  name: string;
  price: number;
  discount: number;
  createdAt: string;
  updatedAt: string;
}

export class ProductsResponseDto {
  items: ProductDto[];
  total: number;
}
