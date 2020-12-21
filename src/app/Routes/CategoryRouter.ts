import { NextFunction, Request, Response, Router } from 'express';
import CategoryDTO from 'src/domain/dtos/category/CategoryDTO';
import CreateCategoryDTO from 'src/domain/dtos/category/createCategoryDTO';
import IDbContext from 'src/infra/interfaces/IDbContext';
import CategoryService from 'src/services/CategoryService';

import IRouterBase from './IRouterBase';

export default class CategoryRouter implements IRouterBase {
  readonly path = '/category';

  private readonly _categoryService: CategoryService;
  readonly dbContext: IDbContext;

  constructor(dbContext: IDbContext) {
    this.dbContext = dbContext;
    this._categoryService = new CategoryService(this.dbContext);
  }

  async createCategory(createCategory: CreateCategoryDTO ): Promise<boolean> {
    return await this._categoryService.saveCategory(createCategory);
  }

  async getCategory(id: string): Promise<CategoryDTO | null> {
    return await this._categoryService.getCategory(id);
  }

  async getCategories(): Promise<CategoryDTO[]> {
    return await this._categoryService.getCategories();
  }

  async deleteCaterory(category: string): Promise<boolean> {
    return await this._categoryService.removeCategory(category);
  }


  register(router: Router): void {
    router.get(
      `${this.path}/:id`,
      async (
        req: Request,
        resp: Response,
        next: NextFunction
      ): Promise<void> => {
        try {
          const id = req.params.id;
          const categories = await this.getCategory(id);
          resp.send(categories);

          return next();
        } catch (error) {
          next(`Erro ao contar categorias: ${error.message}`);
        }
      }
    );


    router.get(
      `${this.path}`,
      async (
        req: Request,
        resp: Response,
        next: NextFunction
      ): Promise<void> => {
        try {
          const categories = await this.getCategories();
          resp.send(categories);

          return next();
        } catch (error) {
          next(`Erro ao contar categorias: ${error.message}`);
        }
      }
    );

    router.post(
      this.path,
      async (
        req: Request<CreateCategoryDTO>,
        resp: Response,
        next: NextFunction
      ): Promise<void> => {
        try {
          const result = await this.createCategory(req.body)
          resp.send(result);

          return next();
        } catch (error) {
          next(error.message);
        }
      }
    );

    router.delete(
      `${this.path}/:category`,
      async (
        req: Request,
        resp: Response,
        next: NextFunction
      ): Promise<void> => {
        try {
          const category = req.params.category;

          const result = await this.deleteCaterory(category);
          resp.send(result);

          return next();
        } catch (error) {
          next(error.message);
        }
      }
    );
  }
}

