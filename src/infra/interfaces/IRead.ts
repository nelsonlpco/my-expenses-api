import { FilterQuery } from 'mongodb';

export default interface IRead<T> {
  find(query?: FilterQuery<any>): Promise<T[]>;
  findOne(id: string): Promise<T | null>;
}
