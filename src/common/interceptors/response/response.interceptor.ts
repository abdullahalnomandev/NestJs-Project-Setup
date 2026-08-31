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

    return next.handle().pipe(
      map((data) => {
        const base = {
          success: true,
          message: this.getMessage(request.method),
        };

        if (
          data &&
          typeof data === 'object' &&
          'meta' in data &&
          'data' in data
        ) {
          const { meta, data: dataArray } = data as any;
          const pagination = {
            total: meta.total,
            limit: meta.limit,
            page: meta.page,
            totalPage: meta.totalPages ?? meta.totalPage,
          };
          return {
            ...base,
            pagination,
            data: dataArray,
          };
        }

        return {
          ...base,
          data,
        };
      }),
    );
  }

  private getMessage(method: string): string {
    switch (method) {
      case 'POST':
        return 'Data created successfully';

      case 'PATCH':
      case 'PUT':
        return 'Data updated successfully';

      case 'DELETE':
        return 'Data deleted successfully';

      case 'GET':
        return 'Data retrieved successfully';
      default:
        return 'Request successful';
    }
  }
}
