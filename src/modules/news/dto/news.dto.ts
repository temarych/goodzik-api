import { ApiProperty } from '@nestjs/swagger';
import { News } from '../news.entity';

export class NewsDto {
  @ApiProperty({
    example: '1111',
    description: 'The id of the news',
  })
  public id: string;

  @ApiProperty({
    example: 'new item',
    description: 'Title of the news',
  })
  public title: string;

  @ApiProperty({
    description: 'Images from news',
  })
  public image: string[];

  @ApiProperty({
    description: 'Text of news',
  })
  public description: string;

  @ApiProperty({
    example: 'makson10',
    description: 'Author of the news',
  })
  public author: string;

  @ApiProperty({
    description: 'Date of the news',
  })
  public date: Date;

  public static fromEntity(entity: News): NewsDto {
    const dto = new NewsDto();

    dto.id = entity.id;
    dto.author = entity.author;
    dto.title = entity.title;
    dto.description = entity.description;
    dto.image = entity.image;
    dto.date = entity.date;

    return dto;
  }
}
