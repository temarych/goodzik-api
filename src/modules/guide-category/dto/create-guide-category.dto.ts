import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGuideCategoryDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public name: string;
}
