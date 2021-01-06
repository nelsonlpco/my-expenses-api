import { isValidObjectId } from "mongoose"

export default interface IValidator {
  isValid():boolean;
  errorMessage(): string;
  errors(): string[];
}
