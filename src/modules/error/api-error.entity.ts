import { HttpStatus } from '@nestjs/common';
import { IApiError } from './api-error.interface';
import { ApiErrorCode } from './api-error-code.enum';
import { apiErrorMap } from './api-error.map';

export class ApiError extends Error implements IApiError {
  public code: ApiErrorCode;
  public status?: HttpStatus;
  public message: string;

  constructor(code: ApiErrorCode, options?: Partial<Omit<IApiError, 'code'>>) {
    const data = apiErrorMap[code];
    super(options?.message ?? data.message);
    this.code = code;
    this.status = options?.status ?? data.status;
  }
}
