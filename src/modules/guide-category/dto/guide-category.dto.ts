import { ApiProperty } from '@nestjs/swagger';
import { GuideCategory } from '../guide-category.entity';

export class GuideCategoryDto {
  @ApiProperty()
  public id: string;

  @ApiProperty()
  public name: string;

  public static fromEntity(entity: GuideCategory): GuideCategoryDto {
    const dto = new GuideCategoryDto();

    dto.id = entity.id;
    dto.name = entity.name;

    return dto;
  }
}
