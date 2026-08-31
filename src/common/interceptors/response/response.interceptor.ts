import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, any>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<any> {
    const request = context.switchToHttp().getRequest();

    return next.handle().pipe(
      map((data) => ({
        success: true,
        message: this.getMessage(request.method),
        data,
      })),
    );
  }

  private getMessage(method: string): string {
    switch (method) {
      case 'POST':
        return 'Resource created successfully';

      case 'PATCH':
      case 'PUT':
        return 'Resource updated successfully';

      case 'DELETE':
        return 'Resource deleted successfully';

      case 'GET':
        return 'Resource fetched successfully';

      default:
        return 'Request successful';
    }
  }
}