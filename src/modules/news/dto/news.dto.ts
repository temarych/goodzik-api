import { ApiProperty } from '@nestjs/swagger';

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
  public date: string;
}
