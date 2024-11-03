import * as dynamoose from 'dynamoose'

const UsersSchema = new dynamoose.Schema({
  id: {
    type: String,
    hashKey: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    rangeKey: true,
    index: {
      name: 'EmailIndex',
      type: 'global'
    }
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true
  }
})

export const UsersModel = dynamoose.model('users', UsersSchema)
