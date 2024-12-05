import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class UpdateGuideDto {
  @IsString()
  @ApiProperty({ required: false })
  public title?: string;

  @IsString()
  @ApiProperty({ required: false })
  public description?: string;

  @IsString()
  @ApiProperty({ required: false })
  public imageUrl?: string;

  @IsArray()
  @ApiProperty({ required: false, type: [String] })
  public categories?: string[];
}
