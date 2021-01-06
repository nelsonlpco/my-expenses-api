import IValidator from "./IValidator";

export default class TextValidator implements IValidator {
  fieldName: string;
  value: string;
  maxLength?: number;
  minLength?: number;
  isRequired: boolean;
  private _errors: string[] = [];

  constructor(fieldName: string, value: string){
    this.fieldName = fieldName;
    this.value = value;
    this.isRequired = false;
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

  withIsRequired(value: boolean) {
    this.isRequired = value;
    return this;
  }

  isValid(): boolean {
    if(this.isRequired && !this.value) {
      this._errors.push(`O campo ${this.fieldName} é obrigatório.`);
      return false;
    }

    if(this.minLength && this.value.length < this.minLength){
      this._errors.push(`O campo ${this.fieldName} precisa ter ao menos.${this.minLength}`);
      return false;
    }

    if(this.maxLength && this.value.length >  this.maxLength) {
      this._errors.push(`O campo ${this.fieldName} aceita no máximo ${this.maxLength} caracteres.`);
      return false;
    }

    return true;
  }

  errorMessage(): string {
    return this._errors.join('\n');
  }
}
