import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateGuideDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  public title?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  public description?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, type: [String] })
  public exampleImages?: string[];

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  public videoUrl?: string;

  @IsArray()
  @IsOptional()
  @ApiProperty({ required: false, type: [String] })
  public categories?: string[];
}
