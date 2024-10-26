import { Controller, Get, Query, NotFoundException } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('books/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async getAllCategories() {
    return await this.categoriesService.findAllCategories();
  }

  @Get('findById')
  async findById(@Query('id') id: string) {
    const category = await this.categoriesService.findCategoryById(id);

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }
}
