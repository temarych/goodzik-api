import { ApiProperty } from '@nestjs/swagger';
import { GuideStep } from '../guide-step.entity';

export class GuideStepDto {
  @ApiProperty()
  public id: string;

  @ApiProperty()
  public name: string;

  @ApiProperty()
  public description: string;

  @ApiProperty()
  public image: string;

  @ApiProperty()
  public order: number;

  public static fromEntity(entity: GuideStep): GuideStepDto {
    const dto = new GuideStepDto();

    dto.id = entity.id;
    dto.name = entity.name;
    dto.description = entity.description;
    dto.image = entity.image;
    dto.order = entity.order;

    return dto;
  }
}
