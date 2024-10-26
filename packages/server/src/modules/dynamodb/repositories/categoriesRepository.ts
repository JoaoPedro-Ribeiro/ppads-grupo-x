import { Injectable, Inject } from '@nestjs/common'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { Category } from './category.interface';

@Injectable()
export class CategoriesRepository {
  private readonly db: DocumentClient
  private readonly table = 'categories'

  constructor(@Inject('DYNAMODB') private readonly dynamoDb: DocumentClient) {
    this.db = dynamoDb
  }

  async readAllCategories(): Promise<{ success: boolean; data: Category[] }> {
    const params = {
      TableName: this.table
    }

    try {
      const { Items = [] } = await this.db.scan(params).promise()
      return {
        success: true,
        data: Items.map((item) => ({
          category_id: item.category_id,
          category: item.category
        }))
      }
    } catch (error) {
      console.debug(
        'CategoriesRepository :: readAllCategories :: DynamoError -> ',
        error
      )
      return { success: false, data: [] };
    }
  }
  
  async findOne(params: { id: string }): Promise<Category | null> {
    const paramsDb = {
        TableName: this.table,
        Key: {
            category_id: params.id,
        },
    };

    try {
        const { Item } = await this.db.get(paramsDb).promise();
        return Item ? {
            category_id: Item.category_id,
            category: Item.category,
        } : null;
    } catch (error) {
        console.error(
            'CategoriesRepository :: findOne :: DynamoError -> ',
            error
        );
        return null;
    }
}
}
