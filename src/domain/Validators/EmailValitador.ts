import IValidator from "./IValidator";

export default class EmailValidator implements IValidator {
  email:string;

  constructor(email:string)  {
    this.email = email;
  }
  errors(): string[] {
    return [ this.errorMessage()];
  }

  errorMessage(): string {
    if(this.isValid())
      return "";

    return `${this.email} não é um email valido.`;
  }

  isValid(): boolean {
    return  /^[a-z0-9.]+@[a-z0-9]+\.([a-z]+)?$/i.test(this.email);
  }
}
