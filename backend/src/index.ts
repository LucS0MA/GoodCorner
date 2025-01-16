import "dotenv/config";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import jwt, { Secret } from "jsonwebtoken";
import * as cookie from "cookie";
import { dataSourceGoodCorner } from "./config/db";
import { buildSchema } from "type-graphql";
import AdResolver from "./resolvers/AdResolver";
import CategoryResolver from "./resolvers/CategoryResolver";
import TagResolver from "./resolvers/TagResolver";
import UserResolver from "./resolvers/UserResolver";
import TempUserResolver from "./resolvers/TempUserResolver";

const start = async () => {
  if (
    process.env.JWT_SECRET_KEY === null ||
    process.env.JWT_SECRET_KEY === undefined
  ) {
    throw Error("no jwt secret");
  }
  await dataSourceGoodCorner.initialize();

  const schema = await buildSchema({
    resolvers: [AdResolver, CategoryResolver, TagResolver, UserResolver, TempUserResolver],
    authChecker: ({ context }, rolesForOperation) => {
      console.log("roles for this query / mutation", rolesForOperation);
      if (context.email) {
        if (rolesForOperation.length === 0) {
          return true;
        } else {
          if (rolesForOperation.includes(context.userRole)) {
            return true;
          } else {
            return false;
          }
        }
      } else {
        return false;
      }
    },
  });

  const server = new ApolloServer({
    schema,
  });
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req, res }) => {
      if (req.headers.cookie) {
        const cookies = cookie.parse(req.headers.cookie as string);
        if (cookies.token !== undefined) {
          const payload: any = jwt.verify(
            cookies.token,
            process.env.JWT_SECRET_KEY as Secret
          );
          console.log("payload in context", payload);
          if (payload) {
            return {
              email: payload.email,
              userRole: payload.userRole,
              res: res,
            };
          }
        }
      }
      return { res: res };
    },
  });

  console.log(`🚀 Server listening at: ${url}`);
  console.log("test hot reload");
};
start();
