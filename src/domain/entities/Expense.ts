import Category from "./Category";
import EntityBase from "./EntityBase";

export default class Expense extends EntityBase {
  description: string;
  category: Category;

  constructor(description: string, category: Category){
    super()

    this.description = description;
    this.category = category;
  }
}
