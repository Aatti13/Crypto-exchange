import natural from 'natural';

class SentimentAnalyzer {
  constructor(){
    this.analyzer = new natural.SentimentAnalyzer(
      'English',
      natural.PorterStemmer,
      'afinn'
    );
  }

  analyze(text){
    const tokens = new natural.WordTokenizer().tokenize(text.toLowerCase());
    const sentiment = this.analyzer.getSentiment(tokens);

    if(sentiment > 0.5){
      return 'positive';
    }
    if(sentiment < -0.5){
      return 'negative';
    }
    return 'neutral';
  }
}

export default SentimentAnalyzer;