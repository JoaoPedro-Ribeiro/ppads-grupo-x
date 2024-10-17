import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dts/category.dto';
import { UpdateCategoryDto } from './dts/categoryUpdate.dto';

@Injectable()
export class CategoriesService {
  private categories: CreateCategoryDto[] = []; // Inicializando categorias como um array vazio

  // Criar nova categoria
  create(createCategoryDto: CreateCategoryDto) {
    this.categories.push(createCategoryDto);
    return { message: `Category ${createCategoryDto.name} created successfully!`, category: createCategoryDto };
  }

  // Ler todas as categorias
  findAllCategories() {
    return this.categories;
  }

  // Ler categoria por ID
  findCategoryById(category_id: number) {
    const category = this.categories.find(cat => cat.category_id === category_id);
    if (!category) {
      throw new Error('Category not found'); // Lança erro se não encontrar a categoria
    }
    return category;
  }

  // Atualizar categoria
  updateCategory(category_id: number, updateCategoryDto: UpdateCategoryDto) {
    const categoryIndex = this.categories.findIndex(cat => cat.category_id === category_id);
    if (categoryIndex === -1) {
      throw new Error('Category not found'); // Lança erro se não encontrar a categoria
    }
    const updatedCategory = { ...this.categories[categoryIndex], ...updateCategoryDto };
    this.categories[categoryIndex] = updatedCategory; // Atualiza a categoria
    return { message: `Category ${category_id} updated successfully!`, category: updatedCategory };
  }

  // Remover categoria
  deleteCategory(category_id: number) {
    const categoryIndex = this.categories.findIndex(cat => cat.category_id === category_id);
    if (categoryIndex === -1) {
      throw new Error('Category not found'); // Lança erro se não encontrar a categoria
    }
    const deletedCategory = this.categories.splice(categoryIndex, 1);
    return { message: `Category ${category_id} deleted successfully!`, category: deletedCategory };
  }
}
