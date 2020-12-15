import { NextFunction, Request, Response, Router } from 'express';
import CreateExpenseDTO from "src/domain/dtos/expenses/createExpenseDTO";
import Expense from "src/domain/entities/Expense";
import IDbContext from "src/infra/interfaces/IDbContext";
import ExpenseService from "src/services/ExpenseService";
import IRouterBase from "./IRouterBase";

export default class ExpenseRouter implements IRouterBase {
  readonly path = '/expense';

  private readonly _expenseService: ExpenseService;
  readonly dbContext: IDbContext;

  constructor(dbContext: IDbContext) {
    this.dbContext = dbContext;
    this._expenseService = new ExpenseService(this.dbContext);
  }

  async createExpense(createExpenseDTO: CreateExpenseDTO): Promise<boolean> {
    return await this._expenseService.save(createExpenseDTO);
  }

  async getExpenses(): Promise<Expense[]> {
    return await this._expenseService.getExpenses();
  }

  register(router: Router): void {
    router.get(
      `${this.path}`,
      async (
        req: Request,
        resp: Response<Expense[]>,
        next: NextFunction
      ): Promise<void> => {
        try {
          const expenses = await this.getExpenses();
          resp.send(expenses);

          return next();
        } catch (error) {
          next(`Erro ao listar despesas: ${error.message}`);
        }
      }
    );

    router.post(
      this.path,
      async (
        req: Request<CreateExpenseDTO>,
        resp: Response,
        next: NextFunction
      ): Promise<void> => {
        try {
          const result = await this._expenseService.save(req.body)
          resp.send(result);

          return next();
        } catch (error) {
          next(error.message);
        }
      }
    );
  }
}
