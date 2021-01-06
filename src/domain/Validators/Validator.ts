import EmailValidator from "./EmailValitador";
import IValidator from "./IValidator";
import PasswordValidator from "./PasswordValidator";
import TextValidator from "./TextValidator";

export default class Validator {
  validators: IValidator[] = [];
  errors: string[] = [];

  withEmail(value: string) {
    this.validators.push(new EmailValidator(value));
    return this;
  }

  withTextValidator(value: TextValidator){
    this.validators.push(value);
    return this;
  }

  withPasswordValidator(value: PasswordValidator){
    this.validators.push(value);
    return this;
  }

  validate(): boolean{
    let isValid = true;
    this.validators.forEach(validator => { isValid = validator.isValid(); } );

    return isValid;
  }

  getErrors(): string[] {
    return this.validators.flatMap(validator => validator.errors());
  }
}
