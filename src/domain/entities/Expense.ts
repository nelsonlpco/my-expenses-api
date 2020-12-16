import Category from "./Category";
import EntityBase from "./EntityBase";

export default class Expense extends EntityBase {
  description: string;
  value: number;
  category: Category;

  constructor(description: string, category: Category, value: number){
    super()

    this.description = description;
    this.category = category;
    this.value = 0;
  }
}
