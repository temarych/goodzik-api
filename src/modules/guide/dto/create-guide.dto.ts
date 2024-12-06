import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { CreateGuideStepDto } from '@modules/guide-step/dto/create-guide-step.dto';

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
  @ApiProperty({ type: [String] })
  public exampleImages: string[];

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public videoUrl: string;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty({ type: [String] })
  public categories: string[];

  @IsArray()
  @IsNotEmpty()
  @ApiProperty({ type: [CreateGuideStepDto] })
  public steps: CreateGuideStepDto[];
}
