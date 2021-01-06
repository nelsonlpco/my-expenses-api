export default class Email {
  private _email: string = '';

  constructor(email: string){
    this.Email = email;
  }

  set Email(value: string) {
    if(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i.test(value))
      this._email = value;
    else
      throw new Error("Email invalido");
  }

  get Email(){ return this._email; }
}
