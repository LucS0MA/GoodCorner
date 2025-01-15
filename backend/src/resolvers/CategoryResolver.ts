import CategoryInputs from "../inputs/CategoryInput";
import { Category } from "../entities/Category";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import UpdateCategoryInput from "../inputs/UpdateCategoryInput";

@Resolver(Category)
class CategoryResolver {
  @Query(() => [Category])
  async getAllCategories() {
    const categories = await Category.find({
      order: {
        id: "DESC",
      },
    });
    return categories;
  }

  @Query(() => Category)
  async getCategoryById(@Arg("id") id: number) {
    const category = await Category.findOneByOrFail({ id: id });
    return category;
  }

  @Mutation(() => Category)
  async createNewCategory(@Arg("data") newCategoryData: CategoryInputs) {
    const categoryToSave = new Category();
    categoryToSave.title = newCategoryData.title;

    const result = await categoryToSave.save();
    return result;
  }

  @Mutation(() => String)
  async updateCategory(@Arg("data") updateCategoryData: UpdateCategoryInput) {
    let categoryToUpdate = await Category.findOneByOrFail({
      id: updateCategoryData.id,
    });
    console.log("Category to update", categoryToUpdate);
    categoryToUpdate = Object.assign(categoryToUpdate, updateCategoryData);
    console.log("Category to update", categoryToUpdate);
    const result = await categoryToUpdate.save();
    console.log(result);
    return "Category has been updated";
  }

  @Mutation(() => String)
  async deleteCategory(@Arg("id") id: number) {
    const result = await Category.delete(id);
    console.log("result", result.affected);
    if (result.affected === 1) {
      return "Category has been deleted";
    } else {
      throw new Error("Category has not been found");
    }
  }
}

export default CategoryResolver;
