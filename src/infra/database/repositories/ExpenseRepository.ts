import Expense from "src/domain/entities/Expense";
import IDbContext from "src/infra/interfaces/IDbContext";
import MongoRepository from "./MongoRepository";

export default class ExpenseRepository extends MongoRepository<Expense>{
  constructor(dbContext: IDbContext) {
    super(dbContext, 'expenses');
  }
}
