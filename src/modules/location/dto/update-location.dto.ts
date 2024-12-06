import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateLocationDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  public title?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  public lat?: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  public lng?: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  public contactFullName?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  public contactPhoneNumber?: string;
}
