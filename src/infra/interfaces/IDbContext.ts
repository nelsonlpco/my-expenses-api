import { Collection } from 'mongodb';

export default interface IContext {
  connect(): Promise<boolean>;
  close(): Promise<boolean>;
  getCollection(collection: string): Collection | undefined;
}
