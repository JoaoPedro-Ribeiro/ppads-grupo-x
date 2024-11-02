import {
  Controller,
  Get,
  Query,
  NotFoundException,
  UseGuards
} from '@nestjs/common'
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
  async findById(@Query('id') id: string) {
    const category = await this.categoriesService.findCategoryById(id)

    if (!category) {
      throw new NotFoundException('Category not found')
    }

    return category
  }
}
