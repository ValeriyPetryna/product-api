import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Products API')
  .setDescription('Products API description')
  .setVersion('1.0')
  .addTag('Auth')
  .build();
