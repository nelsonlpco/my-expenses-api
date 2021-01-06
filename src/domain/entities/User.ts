import bcrypt from 'bcrypt';
import BaseDocument from '../documents/BaseDocument';
import IDocument from '../documents/IDocument';
import UserDocument from '../documents/UserDocument';
import PasswordValidator from '../Validators/PasswordValidator';

import TextValidator from "../Validators/TextValidator";
import Validator from "../Validators/Validator";
import EntityBase from "./EntityBase";

export default class User extends EntityBase implements IDocument<UserDocument> {
  name: string;
  email: string;
  password: string;

  validator?: Validator;

  constructor(id?:string) {
    super(id);
    this.name = '';
    this.email = '';
    this.password = '';
  }

  setValidator() {
    this.validator = new Validator()
    .withEmail(this.email)
    .withTextValidator(new TextValidator("Name", this.name )
      .withMinLength(3)
      .withMaxLength(40))
    .withPasswordValidator(new PasswordValidator(this.password).withNumbers().withUppercase().withMinLength(6));

  }

  populate(_id: string, name: string, email: string, password: string){
    this._id = _id || this._id;
    this.name = name;
    this.email = email;
    this.password = password;

    this.setValidator();
  }

  toDocument(): UserDocument{
    return new UserDocument(this);
  }

  fromDocument(document: UserDocument) {
    this.populate(document._id, document.name, document.email, document.password);
  }

  isValid(): boolean {
    return this.validator!.validate();
  }

  getErrors(): string[] {
    return this.validator!.getErrors();
  }

  async protectedPassword() {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);

    this.password = hashedPassword;
  }

  async validatePassword(password: string): Promise<boolean>{
    return await bcrypt.compare(this.password, password);
  }
}
