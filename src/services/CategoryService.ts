import CreateCategoryDTO from "src/domain/dtos/category/createCategoryDTO";
import Category from "src/domain/entities/Category";
import { CategoryRepository } from "src/infra/database/repositories/CategoryRepository";
import IDbContext from "src/infra/interfaces/IDbContext";

export default class CategoryService {
  private readonly _categoryRepository: CategoryRepository;

  constructor(dbContext: IDbContext){
     this._categoryRepository = new CategoryRepository(dbContext);
  }

  async getTotalCategories(): Promise<number> {
    return await this._categoryRepository.countOfCategories();
  }

  async saveCategory(createCategory: CreateCategoryDTO): Promise<boolean>{
    return await this._categoryRepository.create(new Category(createCategory.description));
  }

  async getCategory(id: string): Promise<Category | null> {
    const result = await this._categoryRepository.findById(id);

    return result;
  }

  async getCategories(): Promise<Category[]> {
    const result = await this._categoryRepository.find();

    return result;
  }
}
