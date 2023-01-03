import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderRepositoryService } from './order-repository.service';
import { Order } from './model/order.model';

@Module({
  exports: [OrderRepositoryService],
  imports: [SequelizeModule.forFeature([Order])],
  providers: [OrderRepositoryService],
})
export class OrderRepositoryModule {}
