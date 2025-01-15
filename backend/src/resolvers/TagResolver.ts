import TagInputs from "../inputs/TagInputs";
import { Tag } from "../entities/Tag";
import { Arg, Mutation, Query, Resolver } from "type-graphql";

@Resolver(Tag)
class TagResolver {
  @Query(() => [Tag])
  async getAllTags() {
    const tags = await Tag.find({
      order: {
        id: "DESC",
      },
    });
    return tags;
  }

  @Mutation(() => Tag)
  async createNewTag(@Arg("data") newTagData: TagInputs) {
    const tagToSave = new Tag();
    tagToSave.name = newTagData.name;

    const result = await tagToSave.save();
    return result;
  }

  @Query(() => Tag)
  async getTagById(@Arg("id") id: number) {
    const tag = await Tag.findOneByOrFail({ id: id });
    return tag;
  }
}

export default TagResolver;
