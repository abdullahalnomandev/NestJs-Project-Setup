import { Injectable, ValidationPipe, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class QueryValidationPipe extends ValidationPipe {
  constructor() {
    super({
      whitelist: false,
      forbidNonWhitelisted: false,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      stopAtFirstError: true,
    });
  }

  transform(value: any, metadata: ArgumentMetadata) {
    return super.transform(value, metadata);
  }
}
