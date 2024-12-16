import axios from 'axios';
import { parse } from 'rss-to-json';
import NewsArticles from '../models/NewsArticles.js';
import { CRYPTO_KEYWORDS, NEWS_SOURCES } from '../config/constants.js';
import Logger from '../utils/logger.js';


class NewsAggregator {
  static sentimentAnalyzer = new SentimentAnalyzer();

  static extractCrypto(text){
    const textToLower = text.toLowerCase();

    return CRYPTO_KEYWORDS.filter(keyword =>
      textToLower.contains(keyword)
    );
  }

  static async fetchNewsFeed(source) {
    try{
      const feed = await parse(source.url);
      return feed.items.map(item => ({
        title: item.title,
        description: item.description,
        url: item.link,
        source: source.name,
        publishedAt: new Date(item.published),
        cryptocurrencies: this.extractCrypto(item.title+' '+item.description)
      }));
    }catch(error) {
      Logger.error(`Error fetching ${source.name}`);
      return [];
    }
  }

  static calculateRelevance(article) {
    const cryptoCurrencyBonus = article.cryptocurrencies.length*2;
    const sentimentBonus = article.sentiment === 'positive' ? 1
    : article.sentiment === 'negative' ? -1
    : 0;

    return cryptoCurrencyBonus+sentimentBonus;
  }

  static async aggregateNews(){
    const newsPromises = NEWS_SOURCES.map(source =>
      this.fetchNewsFeed(source)
    );

    const newsResults = await Promise.all(newsPromises);
    const flattenedNews = newsResults.flat();

    return flattenedNews.map(article => ({
      ...article,
      sentiment: this.sentimentAnalyzer.analyze(article.title + ' ' + article.description),
      relevanceScore: this.calculateRelevance(article)
    }))
  }

  static async updateNews() {
    try {
      const aggregatedNews = await this.aggregateNews();
      
      const bulkOps = aggregatedNews.map(article => ({
        updateOne: {
          filter: { url: article.url },
          update: article,
          upsert: true
        }
      }));

      await NewsArticles.bulkWrite(bulkOps);
      
      return aggregatedNews.length;
    } catch (error) {
      console.error('Error updating news:', error);
      throw error;
    }
  }
}

export default NewsAggregator;