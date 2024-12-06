import { ApiProperty } from '@nestjs/swagger';
import { GuideComment } from '../guide-comment.entity';

export class GuideCommentDto {
  @ApiProperty()
  public id: string;

  @ApiProperty()
  public text: string;

  @ApiProperty()
  public author: string;

  public static fromEntity(entity: GuideComment): GuideCommentDto {
    const dto = new GuideCommentDto();

    dto.id = entity.id;
    dto.text = entity.text;
    dto.author = entity.author.userName;

    return dto;
  }
}
