import BaseDocument from "./BaseDocument";

export default class UserDocument extends BaseDocument {
  name: string;
  email: string;
  password: string;

  constructor({_id, name, email, password}) {
    super(_id);
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
