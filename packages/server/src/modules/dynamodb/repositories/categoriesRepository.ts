import { Injectable, Inject } from '@nestjs/common'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

@Injectable()
export class CategoriesRepository {
  private readonly db: DocumentClient
  private readonly table = 'categories'

  constructor(
    @Inject('DYNAMODB') private readonly dynamoDb: DocumentClient
  ) {
    this.db = dynamoDb
  }

  async readAllCategories(): Promise<{ success: boolean, data: any[] }> {
    const params = {
      TableName: this.table,
    };

    try {
      const { Items = [] } = await this.db.scan(params).promise()
      return { success: true, data: Items.map(item => ({
        category_id: item.category_id,
        category: item.category
      })) }
    } catch (error) {
      console.debug('CategoriesRepository :: readAllCategories :: DynamoError -> ', error)
      return { success: false, data: null }
    }
  }
}