import CategoryDTO from "src/domain/dtos/category/CategoryDTO";
import CreateCategoryDTO from "src/domain/dtos/category/createCategoryDTO";
import Category from "src/domain/entities/Category";
import { CategoryRepository } from "src/infra/database/repositories/CategoryRepository";
import IDbContext from "src/infra/interfaces/IDbContext";

export default class CategoryService {
  private readonly _categoryRepository: CategoryRepository;

  constructor(dbContext: IDbContext){
     this._categoryRepository = new CategoryRepository(dbContext);
  }

  async saveCategory(createCategory: CreateCategoryDTO): Promise<boolean>{
    const savedCategory = await this._categoryRepository.find(createCategory)

    if(savedCategory.length > 0)
      throw new Error('Categoria já cadastradas');

    return await this._categoryRepository.create(new Category(createCategory.description));
  }

  async getCategory(id: string): Promise<Category | null> {
    const result = await this._categoryRepository.findById(id);

    return result;
  }

  async getCategories(): Promise<CategoryDTO[]> {
    const result = await this._categoryRepository.find();

    const categories = result.sort( (a, b) => {
      if( a.description > b.description) return 1;
      else return -1;

    })

    return result.map(category => new CategoryDTO(category.description));
  }

  async removeCategory(category: string): Promise<boolean> {
    return await this._categoryRepository.delete(category);
  }
}
