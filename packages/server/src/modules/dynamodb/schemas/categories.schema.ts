import * as dynamoose from 'dynamoose'

const CategoriesSchema = new dynamoose.Schema({
  category_id: {
    type: Number,
    hashKey: true
  },
  category: {
    type: String,
    required: true
  }
})

export const CategoriesModel = dynamoose.model('categories', CategoriesSchema)
