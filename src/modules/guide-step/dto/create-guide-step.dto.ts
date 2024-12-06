import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGuideStepDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public name: string;
}
