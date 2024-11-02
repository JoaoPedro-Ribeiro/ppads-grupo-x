import * as dynamoose from 'dynamoose'

const BookSchema = new dynamoose.Schema({
  id: {
    type: String,
    hashKey: true
  },
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  }
})

export const BookModel = dynamoose.model('Book', BookSchema)
