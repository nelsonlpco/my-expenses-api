import  { DELETE, GET, POST, route } from 'awilix-express';
import { Request, Response } from 'express';
import CategoryDTO from 'src/domain/dtos/category/CategoryDTO';
import CategoryService from 'src/services/CategoryService';

@route('/api/category')
export default class CategoryController {
  private readonly _categoryService: CategoryService;

  constructor(categoryService){
    this._categoryService = categoryService;
  }

  @GET()
  async getCategories(req: Request, res: Response){
    const categories = await this._categoryService.getCategories();

    return res.status(200).json(categories);
  }

  @POST()
  async createCategory(req: Request<CategoryDTO>, res: Response) {
    try {
      const categoryEntity = await this._categoryService.saveCategory(req.body);
      const category = new CategoryDTO(categoryEntity.description)

      res.status(200).json({ category });
    }catch(error) {
      console.log(`Erro: ${error.message}`)
    }
  }

  @route("/:category")
  @DELETE()
  async deleteCategory(req: Request, res: Response) {
    const category = req.params.category;
    const result = await this._categoryService.removeCategory(category);
    if(result)
      res.status(200);
    else
      res.status(500).json({message: "Não foi possível excluir a categoria"})
  }

}
