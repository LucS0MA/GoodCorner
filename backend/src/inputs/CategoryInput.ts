import { Category } from "../entities/Category";
import { Field, InputType } from "type-graphql";

@InputType()
class CategoryInput implements Partial<Category> {
  @Field()
  title: string;
}

export default CategoryInput;
