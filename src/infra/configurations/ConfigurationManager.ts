
export default class ConfigurationManager {
  mongodbUri: string;
  mongodbDatabaseName: string;
  mongodbAdminUser: string;
  mongodbAdminPassword: string;
  serverPort: number;
  accessTokenSecrete: string;
  refreshTokenSecrete: string;

  constructor() {
    this.mongodbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
    this.mongodbDatabaseName = process.env.MONGODB_DATABASENAME || '';
    this.mongodbAdminUser = process.env.MONGODB_ADMINUSERNAME || '';
    this.mongodbAdminPassword = process.env.MONGODB_ADMINPASSWORD || '';
    this.serverPort = Number(process.env.SERVER_PORT) || 3000;
    this.accessTokenSecrete = process.env.ACCESS_TOKEN_SECRET || '';
    this.refreshTokenSecrete = process.env.REFRESH_TOKEN_SECRET || '';
  }
}
