import { Injectable } from '@nestjs/common'
import { UsersModel } from '../schemas/users.schema'

@Injectable()
export class UsersRepository {
  async createUser(data: any): Promise<{ success: boolean }> {
    try {
      await UsersModel.create(data)
      return { success: true }
    } catch (error) {
      console.debug('UsersRepository :: createUser :: DynamoError -> ', error)
      return { success: false }
    }
  }

  async readAllUsers(): Promise<{ success: boolean; data: any[] }> {
    try {
      const users = await UsersModel.scan().exec()
      return { success: true, data: users }
    } catch (error) {
      console.debug('UsersRepository :: readAllUsers :: DynamoError -> ', error)
      return { success: false, data: null }
    }
  }

  async getUserByEmail(
    email: string
  ): Promise<{ success: boolean; data: any }> {
    try {
      const user = await UsersModel.query('email').eq(email).exec()

      if (user.length > 0) {
        return { success: true, data: user[0] }
      }
      return { success: true, data: null }
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
    const result = await this.getUserByEmail(email)
    if (result.success && result.data) {
      return { success: true, id: result.data.id }
    }
    return { success: false, id: null }
  }

  async deleteUserByEmail(
    email: string
  ): Promise<{ success: boolean; message?: string }> {
    const { success, data } = await this.getUserByEmail(email)

    const { id } = data

    if (!success || !id) {
      return { success: false, message: 'User not found' }
    }

    try {
      await UsersModel.delete({ id, email })
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

    try {
      await UsersModel.update(id, { password: input.newPassword })
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
