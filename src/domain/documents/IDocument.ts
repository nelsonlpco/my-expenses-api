import BaseDocument from "./BaseDocument";

export default interface IDocumentBase<T extends BaseDocument> {
  toDocument(): T;
  fromDocument(document: T);
}
