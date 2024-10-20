import { Controller, Get } from '@nestjs/common'
import { CategoriesService } from './categories.service'

@Controller('books/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async getAllCategories() {
    return await this.categoriesService.findAllCategories()
  }
}
