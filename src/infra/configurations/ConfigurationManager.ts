import dotenv from 'dotenv';

dotenv.config();

export default class ConfigurationManager {
  mongodbUri: string;
  mongodbDatabaseName: string;
  mongodbAdminUser: string;
  mongodbAdminPassword: string;
  serverPort: number;

  constructor() {
    this.mongodbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
    this.mongodbDatabaseName = process.env.MONGODB_DATABASENAME || '';
    this.mongodbAdminUser = process.env.MONGODB_ADMINUSERNAME || '';
    this.mongodbAdminPassword = process.env.MONGODB_ADMINPASSWORD || '';
    this.serverPort = Number(process.env.SERVER_PORT) || 3000;
  }
}
