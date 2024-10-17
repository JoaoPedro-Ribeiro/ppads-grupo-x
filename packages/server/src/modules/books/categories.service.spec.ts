import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dts/category.dto';
import { UpdateCategoryDto } from './dts/categoryUpdate.dto';


const mockCategoriesRepository = {
  findAllCategories: jest.fn(),
  findCategoryById: jest.fn(),
  create: jest.fn(),
  updateCategory: jest.fn(),
  deleteCategory: jest.fn(),
};

describe('CategoriesService', () => {
  let service: CategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        { provide: 'CategoriesRepository', useValue: mockCategoriesRepository },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a list of categories', async () => {
    const result = { success: true, data: [{ id: 1, name: 'Test Category' }] };
    mockCategoriesRepository.findAllCategories.mockResolvedValue(result);

    expect(await service.findAllCategories()).toBe(result);
    expect(mockCategoriesRepository.findAllCategories).toHaveBeenCalled();
  });

  it('should return a single category by ID', async () => {
    const result = { id: 1, name: 'Test Category' };
    mockCategoriesRepository.findCategoryById.mockResolvedValue(result);

    expect(await service.findCategoryById(1)).toBe(result);
    expect(mockCategoriesRepository.findCategoryById).toHaveBeenCalledWith(1);
  });

  it('should create a new category', async () => {
    const newCategory: CreateCategoryDto = {
      category_id: 1, category: 'New Category', description: 'Description', amount: 100,
      name: ''
    };
    const result = { id: 1, ...newCategory };
    mockCategoriesRepository.create.mockResolvedValue(result);

    expect(await service.create(newCategory)).toBe(result);
    expect(mockCategoriesRepository.create).toHaveBeenCalledWith(newCategory);
  });

  it('should update a category', async () => {
    const updatedCategory = { id: 1, name: 'Updated Category' };
    const updateCategoryDto: UpdateCategoryDto = {
      name: 'Updated Category',
      category_id: 0,
      category: '',
      description: '',
      amount: 0
    };
    mockCategoriesRepository.updateCategory.mockResolvedValue(updatedCategory);

    expect(await service.updateCategory(1, updateCategoryDto)).toBe(updatedCategory);
    expect(mockCategoriesRepository.updateCategory).toHaveBeenCalledWith(1, updateCategoryDto);
  });

  it('should delete a category', async () => {
    const result = { id: 1, name: 'Deleted Category' };
    mockCategoriesRepository.deleteCategory.mockResolvedValue(result);

    expect(await service.deleteCategory(1)).toBe(result);
    expect(mockCategoriesRepository.deleteCategory).toHaveBeenCalledWith(1);
  });
});