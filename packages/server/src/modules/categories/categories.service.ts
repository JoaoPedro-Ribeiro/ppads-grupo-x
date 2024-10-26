import { Injectable } from '@nestjs/common'
import { CategoriesRepository } from '../dynamodb/repositories/categoriesRepository'
import { Category } from '../dynamodb/repositories/category.interface';

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

  async findCategoryById(id: string): Promise<Category | null> {
    const category = await this.categoriesRepository.findOne({ id });
    return category;
  }
}
