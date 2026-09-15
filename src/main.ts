import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './common/interceptors/response/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove extra fields
      forbidNonWhitelisted: true, // Throw error for extra fields
      // transform: true, // Transform to DTO
      // stopAtFirstError: true, // Stop at first error
    }),
  );

  app.useGlobalInterceptors(new ResponseInterceptor());
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();

// nest g resource modules/users --no-spec