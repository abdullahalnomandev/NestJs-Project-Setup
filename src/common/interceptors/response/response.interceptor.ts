import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<any> {
    const request = context.switchToHttp().getRequest();

    const method = request.method;
    const url = request.url;

    return next.handle().pipe(
      map((data) => ({
        success: true,
        message: this.getMessage(method, url),
        data,
      })),
    );
  }

  private getMessage(method: string, url: string): string {
    if (method === 'POST') {
      return 'Resource created successfully';
    }

    if (method === 'PATCH') {
      return 'Resource updated successfully';
    }

    if (method === 'DELETE') {
      return 'Resource deleted successfully';
    }

    if (method === 'GET') {
      return url.includes('/todos/')
        ? 'Todo fetched successfully'
        : 'Todos fetched successfully';
    }

    return 'Request successful';
  }
}
