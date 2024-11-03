import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { CategoriesService } from './categories.service'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@Controller('books/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllCategories() {
    return await this.categoriesService.findAllCategories()
  }

  @UseGuards(JwtAuthGuard)
  @Get('findById')
  async findById(@Query('category_id') category_id: number) {
    return await this.categoriesService.findCategoryById(Number(category_id))
  }
}
