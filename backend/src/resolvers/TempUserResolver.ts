import { TempUser } from "../entities/TempUser";
import { Arg, Query, Resolver } from "type-graphql";

@Resolver(TempUser)
class TempUserResolver {
  @Query(() => [TempUser])
  async getAllTempsUsers() {
    const tempUsers = await TempUser.find({
      order: {
        id: "DESC",
      },
    });
    return tempUsers;
  }

  @Query(() => TempUser)
  async getTempUserById(@Arg("id") id: number) {
    const tempUser = await TempUser.findOneByOrFail({ id: id });
    return tempUser;
  }
}

export default TempUserResolver;
