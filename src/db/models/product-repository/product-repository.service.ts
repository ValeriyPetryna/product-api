import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './model/product.model';
import { ProductEntity } from './entity/product.entity';
import { AbstractRepositoryService } from '../../utils/abstract/abstract.repository.service';
import { PagingResponse } from '../../utils/paging.utils';
import { UpdateProductDao } from './dao/update-product.dao';

@Injectable()
export class ProductRepositoryService extends AbstractRepositoryService<
  Product,
  ProductEntity
> {
  constructor(
    @InjectModel(Product)
    private readonly product: typeof Product,
  ) {
    super();
  }

  async findProducts(): Promise<PagingResponse<ProductEntity>> {
    const products = await this.product.findAll<Product>({});

    const total = await this.countProducts();

    return {
      items: products.map((product) => this.getEntity(product)),
      total,
    };
  }

  async findProductById(productId: number): Promise<ProductEntity> {
    const product = await this.product.findOne<Product>({
      where: {
        id: productId,
      },
    });

    return this.getEntity(product);
  }

  async updateProductById(
    updateProductByIdRequestDto: UpdateProductDao,
  ): Promise<ProductEntity> {
    const [, result] = await this.product.update<Product>(
      updateProductByIdRequestDto,
      {
        where: {
          id: updateProductByIdRequestDto.id,
        },
        returning: true,
      },
    );

    return this.getEntity(result.shift());
  }

  countProducts(): Promise<number> {
    return this.product.count<Product>({});
  }
}
