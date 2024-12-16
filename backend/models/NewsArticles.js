import mongoose from 'mongoose';

const NewsArticleSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true, 
    trim: true 
  },
  description: { 
    type: String, 
    trim: true 
  },
  url: { 
    type: String, 
    required: true, 
    unique: true 
  },
  source: { 
    type: String, 
    required: true 
  },
  publishedAt: { 
    type: Date, 
    default: Date.now 
  },
  tags: [{ type: String }],
  sentiment: { 
    type: String, 
    enum: ['positive', 'negative', 'neutral'],
    default: 'neutral'
  },
  cryptocurrencies: [{ type: String }],
  relevanceScore: { 
    type: Number, 
    default: 0 
  }
}, { 
  timestamps: true,
  indexes: [
    { fields: { title: 'text', description: 'text' } },
    { fields: { publishedAt: -1 } }
  ]
});

export default mongoose.model('NewsArticle', NewsArticleSchema);