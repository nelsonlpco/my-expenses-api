import CategoryDTO from "../category/CategoryDTO"

export default class CreateExpenseDTO {
  description?: string;
  category?: CategoryDTO
  value?: number;
}
