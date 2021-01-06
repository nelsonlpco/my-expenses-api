
export default abstract class BaseDocument {
  _id: string;

  constructor(id: string) {
    this._id = id;
  }
}
