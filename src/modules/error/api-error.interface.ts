import { HttpStatus } from '@nestjs/common';
import { ApiErrorCode } from './api-error-code.enum';

export interface IApiError {
  code: ApiErrorCode;
  status?: HttpStatus;
  message: string;
}
