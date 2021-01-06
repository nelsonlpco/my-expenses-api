import { createContainer, asClass, InjectionMode, AwilixContainer } from "awilix";
import ConfigurationManager from "src/infra/configurations/ConfigurationManager";
import DbContext from "src/infra/database/mongo/DbContext";
import { CategoryRepository } from "src/infra/database/repositories/CategoryRepository";
import UserRepository from "src/infra/database/repositories/UserRepository";
import AuthService from "src/services/AuthService";
import CategoryService from "src/services/CategoryService";
import UserService from "src/services/UserService";
import App from "./App";

export default class Startup {
  instance:AwilixContainer<any>;

  constructor( ) {
    this.instance = this._createContainer();
  }

  async run(){
    try {
      const app = this.instance.resolve<App>('app');
      const result = await app.start(this.instance);

      console.log(result);
    }catch(error) {
      console.log("Erro ao iniciar aplicativo", error);
    }
  }

  private _createContainer(): AwilixContainer<any> {
    const container = createContainer({injectionMode: InjectionMode.CLASSIC});

    container.register({
      app: asClass(App).singleton(),
      config: asClass(ConfigurationManager).singleton(),
      dbContext: asClass(DbContext).singleton(),
      //repositories
      userRepository: asClass(UserRepository),
      categoryRepository: asClass(CategoryRepository),
      //services
      categoryService: asClass(CategoryService),
      userService: asClass(UserService),
      authService: asClass(AuthService),
    });

    return container;
  }
}
