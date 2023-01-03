import { ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from '../models/product-repository/model/product.model';
import { Order } from '../models/order-repository/model/order.model';
import { Invoice } from '../models/invoice-repository/model/invoice.model';

export const databaseOptions = SequelizeModule.forRootAsync({
  useFactory: async (config: ConfigService) => ({
    dialect: 'postgres',
    host: config.get<string>('POSTGRESQL_HOST'),
    port: config.get<number>('POSTGRESQL_PORT'),
    username: config.get<string>('POSTGRESQL_USERNAME'),
    password: config.get<string>('POSTGRESQL_PASSWORD'),
    database: config.get<string>('POSTGRESQL_DATABASE'),
    models: [Product, Order, Invoice],
  }),
  inject: [ConfigService],
});
