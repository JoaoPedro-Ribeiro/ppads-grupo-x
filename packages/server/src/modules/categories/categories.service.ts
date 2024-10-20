import { Injectable } from '@nestjs/common'
import { CategoriesRepository } from '../dynamodb/repositories/categoriesRepository'

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
}
