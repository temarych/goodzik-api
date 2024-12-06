import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateGuideStepDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  public name?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  public description?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  public image?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  public order?: number;
}
