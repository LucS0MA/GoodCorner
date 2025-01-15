import { Category } from "../entities/Category";
import { Field, InputType } from "type-graphql";

@InputType()
class UpDateCategoryInput implements Partial<Category> {
  @Field()
  id: number;

  @Field()
  title: string;
}

export default UpDateCategoryInput;
