import { ApiProperty } from '@nestjs/swagger';
import { GuideStepDto } from '@modules/guide-step/dto/guide-step.dto';
import { GuideCategoryDto } from '@modules/guide-category/dto/guide-category.dto';
import { Guide } from '../guide.entity';

export class GuideDto {
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

  @ApiProperty({ type: [GuideCategoryDto] })
  public categories: GuideCategoryDto[];

  @ApiProperty({ type: [GuideStepDto] })
  public steps: GuideStepDto[];

  public static fromEntity(entity: Guide): GuideDto {
    const dto = new GuideDto();

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
