import { ApiProperty } from '@nestjs/swagger';
import { GuideStep } from '../guide-step.entity';

export class GuideStepDto {
  @ApiProperty()
  public id: string;

  @ApiProperty()
  public name: string;

  public static fromEntity(entity: GuideStep): GuideStepDto {
    const dto = new GuideStepDto();

    dto.id = entity.id;
    dto.name = entity.name;

    return dto;
  }
}
