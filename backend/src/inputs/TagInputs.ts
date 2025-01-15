import { Tag } from "../entities/Tag";
import { Field, InputType } from "type-graphql";

@InputType()
class TagInputs implements Partial<Tag> {
  @Field()
  id: number;
  
  @Field()
  name: string;
}

export default TagInputs;
