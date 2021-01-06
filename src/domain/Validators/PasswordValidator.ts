import IValidator from "./IValidator";

export default class PasswordValidator implements IValidator {
  password: string;
  minLength?: number;
  maxLength?: number;
  hasUppercase: boolean = false;
  hasNumber: boolean = false;
  private _errors: string[] = [];

  constructor(password: string) {
    this.password = password;
  }
  errors(): string[] {
    return this._errors;
  }

  withMinLength(value: number) {
    this.minLength = value;
    return this;
  }

  withMaxLength(value: number) {
    this.maxLength = value;
    return this;
  }

  withUppercase() {
    this.hasUppercase = true;
    return this;
  }

  withNumbers() {
    this.hasNumber = true
    return this;
  }

  isValid(): boolean {
    console.log('validando password', this.password)
    if(!this.password)  {
      this._errors.push('A senha é obrigatório');
      return false;
    }

    if(this.minLength && this.password.length < this.minLength) {
     this._errors.push(`A senha precisa ter no minimo ${this.minLength}`) ;
     return false;
    }

    if(this.maxLength && this.password.length > this.maxLength) {
     this._errors.push(`A senha precisa ter no máximo ${this.maxLength}`) ;
     return false;
    }

    if(this.hasNumber && !/\d/i.test(this.password)) {
     this._errors.push('A senha precisa conter ao menos um número.') ;
     return false;
    }

    if(this.hasUppercase && !/[A-Z]/g.test(this.password)) {
     this._errors.push('A senha precisa conter ao menos uma letra em maiusculo.') ;
     return false;
    }

    return true;
  }

  errorMessage(): string {
    return this._erros.join('\n');
  }
}
