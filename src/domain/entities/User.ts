import EntityBase from "./EntityBase";

export default class User extends EntityBase {
  name: string;
  email: string;
  password: string;

  constructor(name: string, email: string, password: string) {
    super();
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
