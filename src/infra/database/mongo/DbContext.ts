import  { MongoClient, Db, Collection } from 'mongodb';
import ConfigurationManager from 'src/infra/configurations/ConfigurationManager';
import IDbContext from 'src/infra/interfaces/IDbContext';

export default class DbContext implements IDbContext {
  private readonly _configurations: ConfigurationManager;
  private _connection?: MongoClient;
  private _db?:Db;

  constructor(configurations: ConfigurationManager) {
    this._configurations = configurations;
  }
  getCollection(collection: string): Collection<any> | undefined {
    console.log('tentando pegar a collection', this._db)
    if(this._db)
      return this._db.collection(collection);

    return undefined;
  }

  async close(): Promise<boolean> {
    try {
      if(this._connection?.isConnected()){
        await this._connection.close();
      }
      return true
    } catch(error) {
      console.log(error.message);
      return false;
    }
  }

  async connect(): Promise<boolean> {
    try {
      const credentials = `${this._configurations.mongodbAdminUser}:${this._configurations.mongodbAdminPassword}`;
      const connectionString = `mongodb://${credentials}@${this._configurations.mongodbUri}`;
      this._connection = await MongoClient.connect(connectionString);
      this._db = this._connection.db(this._configurations.mongodbDatabaseName);
      console.log('connectado com sucesso');
      return true;
    }
    catch(error) {
      console.log(error.message);
      return false;
    }
  }
}
