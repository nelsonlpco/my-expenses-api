import CreateExpenseDTO from "src/domain/dtos/expenses/createExpenseDTO";
import Expense from "src/domain/entities/Expense";
import { CategoryRepository } from "src/infra/database/repositories/CategoryRepository";
import ExpenseRepository from "src/infra/database/repositories/ExpenseRepository";
import IDbContext from "src/infra/interfaces/IDbContext";

export default class ExpenseService {
  private readonly _categoryRepository: CategoryRepository;
  private readonly _expenseRepository: ExpenseRepository;

  constructor(dbContext: IDbContext){
     this._categoryRepository = new CategoryRepository(dbContext);
     this._expenseRepository = new ExpenseRepository(dbContext);
  }

  async save(expenseDTO: CreateExpenseDTO): Promise<boolean>{
    const category = await this._categoryRepository.findById(expenseDTO.category!._id);

    if(!category)
      throw new Error('Categoria não encontrada');

    const expense = new Expense(expenseDTO.description || '', category, expenseDTO.value || 0);

    return await this._expenseRepository.create(expense);
  }

  async getExpenses(): Promise<Expense[]> {
    const result = await this._expenseRepository.find();

    return result;
  }
}
