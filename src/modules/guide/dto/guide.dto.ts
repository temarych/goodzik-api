import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '@modules/user/dto/user.dto';
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

  @ApiProperty({ type: [String] })
  public exampleImages: string[];

  @ApiProperty()
  public videoUrl: string;

  @ApiProperty({ type: UserDto })
  public author: UserDto;

  public static fromEntity(entity: Guide): GuideDto {
    const dto = new GuideDto();

    dto.id = entity.id;
    dto.title = entity.title;
    dto.description = entity.description;
    dto.date = entity.date;
    dto.exampleImages = entity.exampleImages;
    dto.videoUrl = entity.videoUrl;
    dto.author = UserDto.fromEntity(entity.author);

    return dto;
  }
}
