import { Router } from 'express';
import IDbContext from 'src/infra/interfaces/IDbContext';

import CategoryRouter from './Routes/CategoryRouter';
import ExpenseRouter from './Routes/ExpenseRouter';
import IRouterBase from './Routes/IRouterBase';

export default class RouterManager {
  readonly router: Router;
  readonly routes: IRouterBase[];

  constructor(dbContext: IDbContext) {
    this.router = Router();
    this.routes = [
      new CategoryRouter(dbContext),
      new ExpenseRouter(dbContext),
    ];

    this.register();
  }

  register(): void {
    this.routes.forEach((route) => route.register(this.router));
  }
}
