import { Controller, Get } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { ApiErrorDto } from '@modules/error/api-error.dto';
import { NewsResponseDto } from './dto/news.response.dto';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  @ApiOperation({
    summary: 'News',
    operationId: 'getNews',
    tags: ['news'],
  })
  @ApiOkResponse({ type: NewsResponseDto })
  @ApiBadRequestResponse({ type: ApiErrorDto })
  async getNews(): Promise<NewsResponseDto> {
    const result = await this.newsService.getNews();
    return NewsResponseDto.fromResult(result);
  }
}
