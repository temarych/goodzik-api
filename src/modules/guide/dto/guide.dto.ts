import { ApiProperty } from '@nestjs/swagger';
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

  public static fromEntity(entity: Guide): GuideDto {
    const dto = new GuideDto();

    dto.id = entity.id;
    dto.title = entity.title;
    dto.description = entity.description;
    dto.date = entity.date;
    dto.imageUrl = entity.imageUrl;

    return dto;
  }
}
