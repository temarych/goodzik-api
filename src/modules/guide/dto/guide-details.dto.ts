import { ApiProperty } from '@nestjs/swagger';
import { GuideStepDto } from '@modules/guide-step/dto/guide-step.dto';
import { UserDto } from '@modules/user/dto/user.dto';
import { GuideCommentDto } from '@modules/guide-comment/dto/guide-comment.dto';
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

  @ApiProperty({ type: [String] })
  public exampleImages: string[];

  @ApiProperty()
  public schemas: string[];

  @ApiProperty()
  public videoUrl: string;

  @ApiProperty({ type: [GuideStepDto] })
  public steps: GuideStepDto[];

  @ApiProperty({ type: UserDto })
  public author: UserDto;

  @ApiProperty({ type: [GuideCommentDto] })
  public comments: GuideCommentDto[];

  public static fromEntity(entity: Guide): GuideDetailsDto {
    const dto = new GuideDetailsDto();

    dto.id = entity.id;
    dto.title = entity.title;
    dto.description = entity.description;
    dto.date = entity.date;
    dto.exampleImages = entity.exampleImages;
    dto.videoUrl = entity.videoUrl;
    dto.steps = entity.steps.map(GuideStepDto.fromEntity);
    dto.author = UserDto.fromEntity(entity.author);
    dto.comments = entity.comments.map(GuideCommentDto.fromEntity);

    return dto;
  }
}
