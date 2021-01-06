import cors from 'cors';
import express, { Express } from 'express';
import morgan from 'morgan';
import ConfigurationManager from 'src/infra/configurations/ConfigurationManager';
import DbContext from 'src/infra/database/mongo/DbContext';
import IContext from 'src/infra/interfaces/IDbContext';

import { loadControllers, scopePerRequest } from 'awilix-express';

export default class App {
  config: ConfigurationManager;
  app: Express;
  private readonly _dbContext: IContext;

  constructor(config: ConfigurationManager, dbContext: DbContext) {
    this.config = config;
    this.app = express();
    this._dbContext = dbContext;
  }

  async create(container): Promise<void> {
    await this._dbContext.connect();

    const morganLogger = morgan('combined', {
      stream: {
        write: (meta: any) => {
           console.log("Request served", meta);
        },
      }
    });

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(morganLogger);
    this.app.use(cors({ credentials: true }));

    this.app.use(scopePerRequest(container));

    this.app.use(loadControllers('../controllers/*.ts', { cwd: __dirname}));

    this.app.use(async (error, req, resp, next) => {
      resp.send(409, { error: error.message });

      return next();
    });
  }

  async start(container): Promise<string> {
    await this.create(container);
    const connectedToDb = await this._dbContext.connect();

    if(!connectedToDb) {
      console.log('Erro ao conectar');
      throw new Error('Erro ao conectar');
    }

    return new Promise<string>((resolve) => {
      this.app.listen(this.config.serverPort, () => {
        resolve(`🚀 server is running on ${this.config.serverPort}`);
      });
    });
  }
}
