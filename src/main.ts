import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,       // tự động loại bỏ các field không có trong DTO
      forbidNonWhitelisted: true, // throw lỗi nếu có field lạ
      transform: true,       // tự động transform type (string -> number, v.v.)
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
