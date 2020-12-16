import User from "src/domain/entities/User";
import IDbContext from "src/infra/interfaces/IDbContext";
import MongoRepository from "./MongoRepository";

export default class UserRepository extends MongoRepository<User>{
  constructor(dbContext: IDbContext) {
    super(dbContext, 'users');
  }
}

