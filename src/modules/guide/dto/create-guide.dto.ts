import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGuideDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public imageUrl: string;
}
