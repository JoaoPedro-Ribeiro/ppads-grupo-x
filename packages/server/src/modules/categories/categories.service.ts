import { Injectable } from '@nestjs/common'
import { CategoriesRepository } from '../dynamodb/repositories/categoriesRepository'
import { ErrorsService } from '../errors/errors.service'

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async findAllCategories() {
    const { success, data } =
      await this.categoriesRepository.readAllCategories()

    if (success) {
      return { success, data }
    }
    throw ErrorsService.dynamoError()
  }

  async findCategoryById(category_id: number) {
    const { success, data } =
      await this.categoriesRepository.findById(category_id)

    if (success && data != null) {
      return { success, data }
    }

    if (success && data === null) {
      throw ErrorsService.categoryNoFound()
    }

    throw ErrorsService.dynamoError()
  }
}
