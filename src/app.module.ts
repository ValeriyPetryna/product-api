import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { databaseOptions } from './db/sequelize/database.options';
import { ProductsModule } from './modules/products/products.module';
import { OrdersModule } from './modules/orders/orders.module';
import { InvoicesModule } from './modules/invoices/invoices.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    databaseOptions,
    ProductsModule,
    OrdersModule,
    InvoicesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
