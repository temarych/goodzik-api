import { ApiProperty } from '@nestjs/swagger';
import { HttpException } from '@nestjs/common';
import { apiErrorMap } from './api-error.map';
import { ApiErrorCode } from './api-error-code.enum';
import { ApiError } from './api-error.entity';

export class ApiErrorDto {
  @ApiProperty({
    description: 'The error code',
    example: ApiErrorCode.EntityNotFound,
    enum: ApiErrorCode,
    required: false,
  })
  public code?: ApiErrorCode;

  @ApiProperty({
    description: 'A human-readable message describing the error',
    example: apiErrorMap[ApiErrorCode.EntityNotFound].message,
  })
  public message: string;

  @ApiProperty({
    description: 'Additional details about the error',
    required: false,
    type: 'object',
    example: { entity: 'User' },
  })
  public details?: object;

  public static fromHttpException(data: HttpException): ApiErrorDto {
    const dto = new ApiErrorDto();
    dto.message = data.message;
    return dto;
  }

  public static fromEntity(entity: ApiError): ApiErrorDto {
    const dto = new ApiErrorDto();
    dto.code = entity.code;
    dto.message = entity.message;
    return dto;
  }
}
