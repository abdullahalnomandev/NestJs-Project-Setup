import { Query } from '@nestjs/common';
import { QueryValidationPipe } from 'src/common/pipes/query-validation/query-validation.pipe';

export const queryValidationPipeInstance = new QueryValidationPipe();

export function QueryParams(): ParameterDecorator {
  return Query(queryValidationPipeInstance);
}
