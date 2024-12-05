import { Controller, Get } from '@nestjs/common';
import { telegram_scraper } from 'telegram-scraper';

interface News {
  data_post: string;
  data_view: string;
  user_url: string;
  user_photo: string;
  user_name: string;
  message_url: string;
  message_text: string;
  message_photo: string[];
  message_video: string[];
  views: string;
  datetime: string;
}

const firstTelegramChannelName = 'vyroby_shveina_rota';
const secondTelegramChannelName = 'shveina_rota';

@Controller('news')
export class NewsController {
  @Get()
  async getNews() {
    const news1 = JSON.parse(await telegram_scraper(firstTelegramChannelName));
    const news2 = JSON.parse(await telegram_scraper(secondTelegramChannelName));

    const filteredFirstChannelNews = news1.filter(
      (news: News) => !news.message_text.startsWith('Задати питання'),
    );

    const allNews = [...filteredFirstChannelNews, ...news2];

    return allNews;
  }
}
