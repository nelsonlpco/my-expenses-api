import Category from "src/domain/entities/Category";
import IDbContext from "src/infra/interfaces/IDbContext";
import MongoRepository from "./MongoRepository";

export class CategoryRepository extends MongoRepository<Category>{

  constructor(dbContext: IDbContext) {
    super(dbContext, 'categories');
  }
}
