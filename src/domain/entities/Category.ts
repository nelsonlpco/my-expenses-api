import EntityBase from "./EntityBase";

export default class Category extends EntityBase{
  description: string;

  constructor(description: string) {
    super();
    this.description = description;
  }
}
