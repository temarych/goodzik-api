import { ApiProperty } from '@nestjs/swagger';
import { NewsResult } from '../news.service.types';
import { NewsDto } from './news.dto';

export class NewsResponseDto {
  @ApiProperty({ type: [NewsDto] })
  public news: NewsDto[];

  public static fromResult(result: NewsResult): NewsResponseDto {
    const dto = new NewsResponseDto();

    dto.news = result.news.map(NewsDto.fromEntity);

    return dto;
  }
}
