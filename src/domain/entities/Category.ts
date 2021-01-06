import EntityBase from "./EntityBase";

export default class Category extends EntityBase{
  description: string;

  constructor(description: string, id?:string) {
    super(id);
    this.description = description;
  }
}
