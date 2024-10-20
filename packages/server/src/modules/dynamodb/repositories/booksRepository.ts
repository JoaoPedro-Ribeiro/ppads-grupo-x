import { Injectable, Inject } from '@nestjs/common'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { InputUpdateBookDto } from 'src/modules/books/dto/inputUpdateBook.dto'

@Injectable()
export class BooksRepository {
  private readonly db: DocumentClient
  private readonly table = 'books'

  constructor(@Inject('DYNAMODB') private readonly dynamoDb: DocumentClient) {
    this.db = dynamoDb
  }

  async createBook(data = {}): Promise<{ success: boolean }> {
    const params = {
      TableName: this.table,
      Item: data
    }

    try {
      await this.db.put(params).promise()
      return { success: true }
    } catch (error) {
      console.debug('BooksRepository :: createBook :: DynamoError -> ', error)
      return { success: false }
    }
  }

  async findAllBooks(): Promise<{ success: boolean; data: any[] }> {
    const params = {
      TableName: this.table
    }

    try {
      const { Items = [] } = await this.db.scan(params).promise()
      return { success: true, data: Items }
    } catch (error) {
      console.debug('BooksRepository :: findAllBooks :: DynamoError -> ', error)
      return { success: false, data: null }
    }
  }

  async findBooksByCategory(
    category: number
  ): Promise<{ success: boolean; data: any[] }> {
    const params = {
      TableName: this.table,
      IndexName: 'category-index',
      KeyConditionExpression: 'category = :category',
      ExpressionAttributeValues: {
        ':category': category
      }
    }

    try {
      const { Items = [] } = await this.db.query(params).promise()
      return { success: true, data: Items }
    } catch (error) {
      console.debug(
        'BooksRepository :: findBooksByCategory :: DynamoError -> ',
        error
      )
      return { success: false, data: null }
    }
  }

  async deleteBookById(
    id: string
  ): Promise<{ success: boolean; message?: string }> {
    const params = {
      TableName: this.table,
      Key: {
        id: id
      }
    }

    try {
      await this.db.delete(params).promise()
      return { success: true }
    } catch (error) {
      console.debug(
        'BooksRepository :: deleteBookById :: DynamoError -> ',
        error
      )
      return { success: false }
    }
  }

  async updateBook(input: InputUpdateBookDto): Promise<{ success: boolean }> {
    const updates = Object.entries(input).reduce(
      (acc, [key, value]) => {
        if (key !== 'id' && value !== undefined) {
          acc[key] = value
        }
        return acc
      },
      {} as Record<string, any>
    )

    if (Object.keys(updates).length === 0) {
      return { success: false }
    }

    const params = {
      TableName: this.table,
      Key: {
        id: input.id
      },
      UpdateExpression: this.buildUpdateExpression(updates),
      ExpressionAttributeNames: this.buildExpressionAttributeNames(updates),
      ExpressionAttributeValues: this.buildExpressionAttributeValues(updates),
      ReturnValues: 'UPDATED_NEW'
    }

    try {
      await this.db.update(params).promise()
      return { success: true }
    } catch (error) {
      console.debug('BooksRepository :: updateBook :: DynamoError -> ', error)
      return { success: false }
    }
  }

  private buildUpdateExpression(updates: Record<string, any>): string {
    const set = Object.keys(updates)
      .map((key) => `#${key} = :${key}`)
      .join(', ')
    return `SET ${set}`
  }

  private buildExpressionAttributeNames(
    updates: Record<string, any>
  ): Record<string, string> {
    return Object.keys(updates).reduce(
      (acc, key) => {
        acc[`#${key}`] = key
        return acc
      },
      {} as Record<string, string>
    )
  }

  private buildExpressionAttributeValues(
    updates: Record<string, any>
  ): Record<string, any> {
    return Object.keys(updates).reduce(
      (acc, key) => {
        acc[`:${key}`] = updates[key]
        return acc
      },
      {} as Record<string, any>
    )
  }
}
