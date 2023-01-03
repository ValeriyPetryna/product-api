import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './model/product.model';
import { ProductRepositoryService } from './product-repository.service';

@Module({
  exports: [ProductRepositoryService],
  imports: [SequelizeModule.forFeature([Product])],
  providers: [ProductRepositoryService],
})
export class ProductRepositoryModule {}
