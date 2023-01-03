import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrderRepositoryModule } from '../../db/models/order-repository/order-repository.module';

@Module({
  imports: [OrderRepositoryModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
