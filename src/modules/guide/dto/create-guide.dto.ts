import { ApiProperty } from '@nestjs/swagger';
import { CreateGuideStepDto } from '@modules/guide-step/dto/create-guide-step.dto';

export class CreateGuideDto {
  @ApiProperty()
  public title: string;

  @ApiProperty()
  public description: string;

  @ApiProperty({ type: [String] })
  public exampleImages: string[];

  @ApiProperty()
  public videoUrl: string;

  @ApiProperty({ type: [String] })
  public categories: string[];

  @ApiProperty({ type: [CreateGuideStepDto] })
  public steps: CreateGuideStepDto[];

  @ApiProperty({ type: [String] })
  public schemas: string[];
}
