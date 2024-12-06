import { ApiProperty } from '@nestjs/swagger';
import { NewsDto } from './news.dto';

export class NewsResponseDto {
  @ApiProperty({ type: [NewsDto] })
  public news: NewsDto[];
}
