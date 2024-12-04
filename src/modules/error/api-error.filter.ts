import { Response } from 'express';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { ApiError } from './api-error.entity';
import { ApiErrorDto } from './api-error.dto';

@Catch(ApiError)
export class ApiErrorFilter implements ExceptionFilter {
  catch(error: ApiError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response
      .status(error.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
      .json(ApiErrorDto.fromEntity(error));
  }
}
