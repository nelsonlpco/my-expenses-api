import { Router } from 'express';

export default interface IRouterBase {
  register(router: Router): void;
}
