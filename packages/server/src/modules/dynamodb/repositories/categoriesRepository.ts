import { Injectable } from '@nestjs/common'
import { Category } from '../../categories/interfaces/category.interface'
import { CategoriesModel } from '../schemas/categories.schema'

@Injectable()
export class CategoriesRepository {
  async readAllCategories(): Promise<{ success: boolean; data: Category[] }> {
    try {
      const result = await CategoriesModel.scan().exec()
      return {
        success: true,
        data: result as unknown as Category[]
      }
    } catch (error) {
      console.debug(
        'CategoriesRepository :: readAllCategories :: DynamoError -> ',
        error
      )
      return { success: false, data: [] }
    }
  }

  async findById(
    category_id: number
  ): Promise<{ success: boolean; data: Category | null }> {
    try {
      const category = await CategoriesModel.get({ category_id })
      return {
        success: true,
        data: category ? (category as unknown as Category) : null
      }
    } catch (error) {
      console.error(
        'CategoriesRepository :: findById :: DynamoError -> ',
        error
      )
      return null
    }
  }
}
