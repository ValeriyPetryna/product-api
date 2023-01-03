import { Injectable } from '@nestjs/common';
import { ProductRepositoryService } from '../../db/models/product-repository/product-repository.service';
import { ProductDto, ProductsResponseDto } from './dto/product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productRepositoryService: ProductRepositoryService,
  ) {}

  async findAll(): Promise<ProductsResponseDto> {
    return this.productRepositoryService.findProducts();
  }

  async findOne(id: number): Promise<ProductDto> {
    return this.productRepositoryService.findProductById(id);
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<ProductDto> {
    return this.productRepositoryService.updateProductById({
      id,
      ...updateProductDto,
    });
  }
}
