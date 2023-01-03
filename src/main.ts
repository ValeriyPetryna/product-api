import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './modules/common/swagger/swagger.config';
import { SequelizeUniqueConstraintInterceptor } from './modules/common/interceptors/sequelize-unique-constraint.interceptor';

async function bootstrap() {
  const logger = new Logger(AppModule.name);

  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug'],
  });

  const configService = app.get<ConfigService>(ConfigService);
  const APP_PORT = configService.get('APP_PORT');

  app.useGlobalInterceptors(new SequelizeUniqueConstraintInterceptor());

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('', app, document);

  await app.listen(APP_PORT, () =>
    logger.log(`Server started on port: ${APP_PORT}`),
  );
}
bootstrap();
