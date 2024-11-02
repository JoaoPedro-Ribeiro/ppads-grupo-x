import { Injectable, Inject } from '@nestjs/common'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

@Injectable()
export class UsersRepository {
  private readonly db: DocumentClient
  private readonly table = 'users'

  constructor(@Inject('DYNAMODB') private readonly dynamoDb: DocumentClient) {
    this.db = dynamoDb
  }

  async createUsers(data = {}): Promise<{ success: boolean }> {
    const params = {
      TableName: this.table,
      Item: data
    }

    try {
      await this.db.put(params).promise()
      return { success: true }
    } catch (error) {
      console.debug('UsersRepository :: createUsers :: DynamoError -> ', error)
      return { success: false }
    }
  }

  async readAllUsers(): Promise<{ success: boolean; data: any[] }> {
    const params = {
      TableName: this.table
    }

    try {
      const { Items = [] } = await this.db.scan(params).promise()
      return { success: true, data: Items }
    } catch (error) {
      console.debug('UsersRepository :: readAllUsers :: DynamoError -> ', error)
      return { success: false, data: null }
    }
  }

  async getUserByEmail(
    email: string
  ): Promise<{ success: boolean; data: any }> {
    const params = {
      TableName: this.table,
      IndexName: 'EmailIndex',
      KeyConditionExpression: 'email = :email',
      ExpressionAttributeValues: {
        ':email': email
      }
    }

    try {
      const result = await this.db.query(params).promise()
      const items = result.Items || []

      if (Array.isArray(items) && items.length > 0) {
        return { success: true, data: items[0] }
      }

      return { success: false, data: null }
    } catch (error) {
      console.debug(
        'UsersRepository :: getUserByEmail :: DynamoError -> ',
        error
      )
      return { success: false, data: error }
    }
  }

  async getIdByEmail(
    email: string
  ): Promise<{ success: boolean; id: string | null }> {
    const params = {
      TableName: this.table,
      IndexName: 'EmailIndex',
      KeyConditionExpression: 'email = :email',
      ExpressionAttributeValues: {
        ':email': email
      }
    }

    try {
      const result = await this.db.query(params).promise()
      const items = result.Items || []

      if (items.length > 0) {
        return { success: true, id: items[0].id }
      }

      return { success: false, id: null }
    } catch (error) {
      console.debug('UsersRepository :: getIdByEmail :: DynamoError -> ', error)
      return { success: false, id: null }
    }
  }

  async deleteUserByEmail(
    email: string
  ): Promise<{ success: boolean; message?: string }> {
    const { success, id } = await this.getIdByEmail(email)

    if (!success || !id) {
      return { success: false, message: 'User not found' }
    }

    const params = {
      TableName: this.table,
      Key: {
        id: id,
        email: email
      }
    }

    try {
      await this.db.delete(params).promise()
      return { success: true }
    } catch (error) {
      console.debug(
        'UsersRepository :: deleteUserByEmail :: DynamoError -> ',
        error
      )
      return { success: false }
    }
  }

  async updatePassword(input: {
    email: string
    newPassword: string
  }): Promise<{ success: boolean; message?: string }> {
    const { success, id } = await this.getIdByEmail(input.email)

    if (!success || !id) {
      return { success: false, message: 'User not found' }
    }

    const params = {
      TableName: this.table,
      Key: {
        id: id,
        email: input.email
      },
      UpdateExpression: 'set #password = :newPassword',
      ExpressionAttributeNames: {
        '#password': 'password'
      },
      ExpressionAttributeValues: {
        ':newPassword': input.newPassword
      },
      ReturnValues: 'UPDATED_NEW'
    }

    try {
      await this.db.update(params).promise()
      return { success: true, message: 'Password updated successfully' }
    } catch (error) {
      console.debug(
        'UsersRepository :: updatePassword :: DynamoError -> ',
        error
      )
      return { success: false, message: 'Error updating password' }
    }
  }
}
