import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dts/category.dto';
import { UpdateCategoryDto } from './dts/categoryUpdate.dto';



@Controller('books/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  // Método para obter todas as categorias
  @Get()
  async getAllCategories() {
    return await this.categoriesService.findAllCategories();
  }

  // Método para obter uma categoria pelo ID
  @Get(':id')
  async getCategoryById(@Param('id') id: number) {
    return await this.categoriesService.findCategoryById(Number(id));
  }

  // Método para criar uma nova categoria
  @Post()
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoriesService.create(createCategoryDto);
  }

  // Método para atualizar uma categoria pelo ID
  @Put(':id')
  async updateCategory(@Param('id') id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
    return await this.categoriesService.updateCategory(Number(id), updateCategoryDto);
  }

  // Método para deletar uma categoria pelo ID
  @Delete(':id')
  async deleteCategory(@Param('id') id: number) {
    return await this.categoriesService.deleteCategory(Number(id));
  }
}
