import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateGuideCategoryDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  public name?: string;
}
