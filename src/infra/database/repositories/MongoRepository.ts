import { Collection, FilterQuery, ObjectID } from 'mongodb';
import EntityBase from 'src/domain/entities/EntityBase';
import IDbContext from 'src/infra/interfaces/IDbContext';

import IRead from "src/infra/interfaces/IRead";
import IWrite from "src/infra/interfaces/IWrite";

export default abstract class MongoRepository<T extends EntityBase> implements IWrite<T>, IRead<T> {
  public readonly _collection: Collection;
  public readonly _dbContext: IDbContext;

  constructor(dbContext: IDbContext, collectionName: string) {
    this._dbContext = dbContext;
    this._collection = dbContext.getCollection(collectionName)!;
  }
  findOne(id: string): Promise<T | null> {
    throw new Error('Method not implemented.');
  }

  async create(item: T): Promise<boolean> {
    const result = await this._collection.insertOne(item);

    return !!result.result.ok;
  }

  async update(id: string, item: T): Promise<boolean> {
    const result = await this._collection.updateOne({_id: new ObjectID(id) }, item);

    return !!result.result.ok;
  }

  async delete(category: string): Promise<boolean> {
    const result = await this._collection.deleteOne({description: category});

    return !!result.result.ok;
  }
  async find(query?: FilterQuery<any>): Promise<T[]> {
    const result = await this._collection.find<T>(query);
    return await result.toArray()
  }

  async findById(id: string): Promise<T | null> {
    const result = await this._collection.findOne<T>({ _id: new ObjectID(id)});

    return result;
  }

}
