import { Field, ID, InputType } from "type-graphql";
import { Picture } from "../entities/Picture";
import { Category } from "../entities/Category";
import { Tag } from "../entities/Tag";
import { Ad } from "../entities/Ad";

@InputType()
class PictureInput {
  @Field()
  url: string;
}

@InputType()
class TagInput {
  @Field()
  id: number;
}

@InputType()
class AdInput implements Partial<Ad> {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  owner: string;

  @Field()
  price: number;

  @Field()
  location: string;

  @Field()
  createdAt: Date;

  @Field(() => ID)
  category: Category;

  @Field(() => [PictureInput], { nullable: true })
  pictures?: Picture[];

  @Field(() => [TagInput], { nullable: true })
  tags: Tag[];
}

export default AdInput;
