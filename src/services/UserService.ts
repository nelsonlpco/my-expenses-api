import UserRepository from "src/infra/database/repositories/UserRepository";
import IDbContext from "src/infra/interfaces/IDbContext";

export default class UserService {
  private readonly _userRepository: UserRepository;

  constructor(dbContext: IDbContext){
     this._userRepository = new UserRepository(dbContext);
  }
}

