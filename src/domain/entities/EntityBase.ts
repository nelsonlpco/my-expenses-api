import { v4 as uuidv4 } from 'uuid';

export default class EntityBase {
  _id: string = '';

  constructor(id?: string) {
    this._id = id || uuidv4();
  }
}
