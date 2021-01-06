import UserDocument from "src/domain/documents/UserDocument";
import IDbContext from "src/infra/interfaces/IDbContext";
import MongoRepository from "./MongoRepository";

export default class UserRepository extends MongoRepository<UserDocument>{
  constructor(dbContext: IDbContext) {
    super(dbContext, 'users');
  }
}

