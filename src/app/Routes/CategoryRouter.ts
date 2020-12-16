import { NextFunction, Request, Response, Router } from 'express';
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
          const categories = await this._categoryService.getCategory(id);
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
          const categories = await this._categoryService.getCategories();
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
          const result = await this._categoryService.saveCategory(req.body)
          resp.send(result);

          return next();
        } catch (error) {
          next(error.message);
        }
      }
    );
  }
}

