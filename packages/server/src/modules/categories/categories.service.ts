import { Injectable } from '@nestjs/common'
import { CategoriesRepository } from '../dynamodb/repositories/categoriesRepository'
import { Category } from './interfaces/category.interface'

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async findAllCategories() {
    const { success, data } =
      await this.categoriesRepository.readAllCategories()

    if (success) {
      return { success, data }
    }
    return { success: false, message: 'Falha ao buscar categorias' }
  }

  async findCategoryById(category_id: number): Promise<Category | null> {
    return await this.categoriesRepository.findById(category_id)
  }
}
