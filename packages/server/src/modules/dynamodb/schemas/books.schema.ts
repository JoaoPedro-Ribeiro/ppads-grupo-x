import * as dynamoose from 'dynamoose'

const BooksSchema = new dynamoose.Schema({
  id: {
    type: String,
    hashKey: true
  },
  name: {
    type: String,
    required: true
  },
  normalizedName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: Number,
    required: true,
    index: {
      name: 'category-index',
      type: 'global'
    }
  },
  amount: {
    type: Number,
    required: true
  },
  coverUrl: {
    type: String,
    required: false
  }
})

export const BooksModel = dynamoose.model('books', BooksSchema)
