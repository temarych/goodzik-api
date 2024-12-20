import { Injectable } from '@nestjs/common';
import { telegram_scraper } from 'telegram-scraper';
import { NewsResult } from './news.service.types';

const firstTelegramChannelName = 'vyroby_shveina_rota';
const secondTelegramChannelName = 'shveina_rota';

@Injectable()
export class NewsService {
  public async getNews(): Promise<NewsResult> {
    const news1 = JSON.parse(await telegram_scraper(firstTelegramChannelName));
    const news2 = JSON.parse(await telegram_scraper(secondTelegramChannelName));

    const filteredFirstChannelNews = news1.filter(
      (news) => !news.message_text.startsWith('Задати питання'),
    );

    const allNews = [...filteredFirstChannelNews, ...news2];
    const newsWithDatetime = allNews.filter(
      (news) => news.datetime && news.message_text,
    );
    const sortedNews = newsWithDatetime.sort(
      (a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime(),
    );

    const modifiedNews = sortedNews.map((news) => {
      const idPrefix = news.data_post.startsWith('shveina_rota')
        ? 'shveina_rota/'
        : 'vyroby_shveina_rota/';
      const newsId = news.data_post.replace(idPrefix, '');
      const newsTitle = news.message_text.split('.')[0];

      return {
        id: newsId,
        title: newsTitle,
        image: news.message_photo,
        description: news.message_text,
        author: news.user_name,
        date: news.datetime,
      };
    });

    return { news: modifiedNews };
  }
}
