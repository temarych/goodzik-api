import { ApiProperty } from '@nestjs/swagger';
import { GuideStepDto } from '@modules/guide-step/dto/guide-step.dto';
import { Guide } from '../guide.entity';

export class GuideDetailsDto {
  @ApiProperty()
  public id: string;

  @ApiProperty()
  public title: string;

  @ApiProperty()
  public description: string;

  @ApiProperty()
  public date: Date;

  @ApiProperty()
  public imageUrl: string;

  @ApiProperty()
  public videoUrl: string;

  @ApiProperty({ type: [GuideStepDto] })
  public steps: GuideStepDto[];

  public static fromEntity(entity: Guide): GuideDetailsDto {
    const dto = new GuideDetailsDto();

    dto.id = entity.id;
    dto.title = entity.title;
    dto.description = entity.description;
    dto.date = entity.date;
    dto.imageUrl = entity.imageUrl;
    dto.videoUrl = entity.videoUrl;
    dto.steps = entity.steps.map(GuideStepDto.fromEntity);

    return dto;
  }
}
