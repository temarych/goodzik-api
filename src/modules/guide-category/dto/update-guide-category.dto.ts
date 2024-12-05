import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateGuideCategoryDto {
  @IsString()
  @ApiProperty({ required: false })
  public name?: string;
}
