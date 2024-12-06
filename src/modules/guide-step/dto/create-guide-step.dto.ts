import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateGuideStepDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public image: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  public order: number;
}
